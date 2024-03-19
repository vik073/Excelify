// App imports
import { authCheck } from 'setup/helpers/utils'
import v from 'setup/helpers/validation'
import params from 'setup/config/params'
import { AuthError, ValidationError } from 'modules/common/errors'
import Worksheet from 'modules/worksheet/model'
import Dimension from 'modules/dimension/model'
import Item from 'modules/item/model'
import View from 'modules/view/model'

const fillDimensionSpan = async (dimensionConfig, list, i) => {
  let span = 1 //if dimension depth=0, span=1

  if (i > 0) {
    // console.log(await Dimension.findById(list[i]))
    // console.log('child span', dimensionConfig[list[i - 1]].span)
    // console.log('child items count', await Item.countDocuments({ dimensionId: list[i - 1], worksheetId }))

    span = dimensionConfig[list[i - 1]].span * await Item.countDocuments({ dimensionId: list[i - 1] })
    // console.log('span', span)
  }

  return {
    span,
    depth: i
  }
}

// Compute
export default async function compute({ params: { worksheetId }, auth }) {
  if (authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: worksheetId },
        check: 'isNotEmpty',
        message: 'Invalid worksheet to compute.'
      }
    ]

    // Validate
    try {
      v.validate(rules)
    } catch (error) {
      throw new ValidationError(error.message)
    }

    // 0. get worksheet details
    try {
      const view = await View.findOne({ worksheetId, userId: auth.user._id })

      // 1. Set 'SpanMap' to hold span for each dimension
      const dimensionConfig = {}

      // cols
      for (let i = 0; i < view.dimensionsCol.length; i++) {
        dimensionConfig[view.dimensionsCol[i]] = await fillDimensionSpan(dimensionConfig, view.dimensionsCol, i)
      }
      //  rows
      for (let i = 0; i < view.dimensionsRow.length; i++) {
        dimensionConfig[view.dimensionsRow[i]] = await fillDimensionSpan(dimensionConfig, view.dimensionsRow, i)
      }

      // dimensions mark
      let markDimensionsIds = view.dimensionsMark

      // items mark
      const markItems = await Item
        .find({ dimensionId: { $in: markDimensionsIds } })
        .populate([
          {
            path: 'relationshipId',
            populate: [{
              path: 'relationships'
            }]
          },
          {
            path: 'dimensionId'
          }
        ])

      let matrix = []

      // dimensions index
      const dimensionsRowFlipped = view.dimensionsRow.slice().reverse()
      const dimensionsColFlipped = view.dimensionsCol.slice().reverse()
      // console.log('flipped', dimensionsRowFlipped, 'normal', view.dimensionsRow)

      // loop for all marks
      let loopCounter = 0
      for (const markItem of markItems) {
        // console.log(markItem)

        // console.log('Mark LOOP --- # ', loopCounter)

        let colDimensionItem = []
        let rowDimensionItem = []

        // 2. split dimension items into the a row and col array, sorted by depth
        // col dimensions
        for (const colCat of view.dimensionsCol) {
          for (const relationship of markItem.relationshipId.relationships) { // in the ex., each mark has 4 relationships
            // col dimensions
            if (colCat.toString() === relationship.dimensionId.toString()) { // if the dimension item is on col
              colDimensionItem.push(relationship) // pushes the dimension item Id
              // console.log('markItemsOnCol:   ', colDimensionItem)
            }
          }
        }
        // row dimensions
        for (const rowCat of view.dimensionsRow) {
          for (const relationship of markItem.relationshipId.relationships) { //in the ex., each mark has 4 relationships
            if (rowCat.toString() === relationship.dimensionId.toString()) { //if the dimension item is on row
              rowDimensionItem.push(relationship)
              // console.log('markItemsOnRow:   ', rowDimensionItem)
            }
          }
        }

        // 3b. get position for: row dimension items
        let positionR = view.dimensionsCol.length
        for (const dimensionItem of rowDimensionItem) {
          positionR += (dimensionItem.sequence * dimensionConfig[dimensionItem.dimensionId].span)
        }

        if(!matrix[positionR]) {
          matrix[positionR] = []
        }

        // fill row dimensions in matrix
        for (const dimensionItem of rowDimensionItem) {
          let positionC = dimensionsRowFlipped.indexOf(dimensionItem.dimensionId)

          // [optimization]: check if item not exist
          if(!matrix[positionR] || !matrix[positionR][positionC]) {
            loopCounter++
            // console.log('c', positionC, 'r', positionR, 'value', dimensionItem.value)
            if (!matrix[positionR]) {
              // console.log('empty or "grey cell"')
              matrix[positionR] = []
            }

            const dimension = await Dimension.findOne({ _id: dimensionItem.dimensionId })

            // row - insert
            if (view.dimensionsRow.indexOf(dimension._id) === 0) {
              // console.log('row insert1')
              matrix[positionR][positionC] = {
                _id: dimensionItem._id,
                value: dimensionItem.value,
                isComputed: markItem.isComputed,
                dimensionId: dimension._id,
                sequence: dimensionItem.sequence,
                color: dimension.color,
                spanCol: 1,
                spanRow: dimensionConfig[dimensionItem.dimensionId].span,
                hidden: false,
                axis: params.common.axis.row.key
              }
            } else {
              if (matrix[positionR] && matrix[positionR][positionC + 1] && matrix[positionR][positionC + 1].hidden) {
                // console.log('row insert2, HIDE')
                matrix[positionR][positionC] = {
                  _id: dimensionItem._id,
                  hidden: true
                }
              } else {
                if (
                  matrix[positionR] &&
                  matrix[positionR][positionC + 1] &&
                  dimensionConfig[matrix[positionR][positionC + 1].dimensionId].span !== dimensionConfig[dimensionItem.dimensionId].span &&
                  matrix[positionR][positionC + 1].sequence !== 0
                ) {
                  // console.log('if ....', matrix[positionR + 1], matrix[positionR][positionC + 1], dimensionConfig[matrix[positionR][positionC + 1].dimensionId].span, dimensionConfig[dimensionItem.dimensionId].span, matrix[positionR][positionC + 1].sequence)
                  // console.log('row insert3, HIDE')
                  matrix[positionR][positionC] = {
                    _id: dimensionItem._id,
                    hidden: true
                  }
                } else {
                  // console.log('row insert4')
                  matrix[positionR][positionC] = {
                    _id: dimensionItem._id,
                    value: dimensionItem.value,
                    isComputed: markItem.isComputed,
                    dimensionId: dimension._id,
                    sequence: dimensionItem.sequence,
                    color: dimension.color,
                    spanCol: 1,
                    spanRow: dimensionConfig[dimensionItem.dimensionId].span,
                    hidden: false,
                    axis: params.common.axis.row.key
                  }
                }
              }
            }
          }
        }

        // 3a. get position for: col dimension items
        let positionC = view.dimensionsRow.length // skips grey cells
        for (const dimensionItem of colDimensionItem) { //
          positionC += (dimensionItem.sequence * dimensionConfig[dimensionItem.dimensionId].span) //find 'c' by: sequence * span
          // console.log(dimensionItem.sequence, dimensionConfig[dimensionItem.dimensionId].span, dimensionConfig[dimensionItem.dimensionId])
          // console.log('postionC:   ', positionC)
        }

        // fill column dimensions in matrix
        for (const dimensionItem of colDimensionItem) {
          let positionR = dimensionsColFlipped.indexOf(dimensionItem.dimensionId) //find 'r' by: reverse index of the col dimension

          // [optimization]: check if item not exist
          if(!matrix[positionR] || !matrix[positionR][positionC]) {
            loopCounter++
            // console.log('c', positionC, 'r', positionR, 'value', dimensionItem.value)
            if (!matrix[positionR]) { //to start a new container for the row
              matrix[positionR] = []
            }

            const dimension = await Dimension.findOne({ _id: dimensionItem.dimensionId })

            // col - insert
            if (view.dimensionsCol.indexOf(dimension._id) === 0) { // if col dimension depth = 0
              // console.log('insert1')
              matrix[positionR][positionC] = {
                _id: dimensionItem._id,
                value: dimensionItem.value,
                isComputed: markItem.isComputed,
                dimensionId: dimension._id,
                sequence: dimensionItem.sequence,
                color: dimension.color,
                spanCol: dimensionConfig[dimensionItem.dimensionId].span,
                spanRow: 1,
                hidden: false,
                axis: params.common.axis.col.key
              }
            } else {
              if (
                // check if R+1, a dimension closer to axis, exists
                // check if R+1 @ C, exists
                // follows one-many rule, if the item in a dimension closer to axis is hidden, this item is hidden too
                // **not triggered yet, needs a third col dimension to check it.
                matrix[positionR + 1] &&
                matrix[positionR + 1][positionC] &&
                matrix[positionR + 1][positionC].hidden
              ) {
                // console.log('insert2, HIDE') //
                matrix[positionR][positionC] = {
                  _id: dimensionItem._id,
                  hidden: true
                }
              } else {
                if (
                  // check if R+1, a dimension closer to axis, exists
                  // check if R+1 @ C, exists
                  // item span R+1, C is not equal to this span
                  // item sequence R+1 is not the first [0]
                  matrix[positionR + 1] &&
                  matrix[positionR + 1][positionC] &&
                  dimensionConfig[matrix[positionR + 1][positionC].dimensionId].span !== dimensionConfig[dimensionItem.dimensionId].span &&
                  matrix[positionR + 1][positionC].sequence !== 0
                ) {
                  // console.log('if ....', matrix[positionR + 1], matrix[positionR + 1][positionC], dimensionConfig[matrix[positionR + 1][positionC].dimensionId].span !== dimensionConfig[dimensionItem.dimensionId].span)
                  // console.log(matrix[positionR + 1][positionC].sequence, matrix[positionR + 1][positionC].sequence !== 0)
                  // console.log('insert3, HIDE')
                  matrix[positionR][positionC] = {
                    _id: dimensionItem._id,
                    hidden: true
                  }
                } else {
                  // console.log('insert4')
                  matrix[positionR][positionC] = {
                    _id: dimensionItem._id,
                    value: dimensionItem.value,
                    isComputed: markItem.isComputed,
                    dimensionId: dimension._id,
                    sequence: dimensionItem.sequence,
                    color: dimension.color,
                    spanCol: dimensionConfig[dimensionItem.dimensionId].span,
                    spanRow: 1,
                    hidden: false,
                    axis: params.common.axis.col.key
                  }
                }
              }
            }
          }
        }

        // fill item itself into matrix
        matrix[positionR][positionC] = {
          _id: markItem._id,
          value: markItem.value,
          isComputed: markItem.isComputed,
          dimensionId: markItem.dimensionId._id,
          sequence: 0,
          color: '#bbbbbb',
          spanCol: 1,
          spanRow: 1,
          hidden: false,
          axis: params.common.axis.mark.key
        }
      }

      // console.log(loopCounter)

      // matrix complete!
      // console.log('matrix complete!', matrix)

      // Worksheet - find
      const worksheet = await Worksheet.findOne({
        _id: worksheetId,
        userId: auth.user._id
      })

      if (worksheet) {
        // View - find
        const view = await View.findOne({
          userId: auth.user._id,
          worksheetId: worksheet._id
        })

        // View - save
        view
          ? await View.updateOne(
              { _id: view._id, userId: auth.user._id, worksheetId: worksheet._id },
              { $set: { matrix, dimensionConfig } }
            )
          : await View.create({
              userId: auth.user._id,
              worksheetId: worksheet._id,
              matrix,
              dimensionConfig
            })

        // View - find
        const data = await View.findOne({
          userId: auth.user._id,
          worksheetId: worksheet._id
        })

        return {
          data
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error(`An error occurred. ${error.message}`)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
