// Imports
import { create, all, factory } from 'mathjs'
import replaceString from 'replace-string'

// App imports
import { authCheck, cartesian } from 'setup/helpers/utils'
import v from 'setup/helpers/validation'
import { AuthError, ValidationError } from 'modules/common/errors'
import Formula from 'modules/formula/model'
import Item from 'modules/item/model'
import Dimension from 'modules/dimension/model'
import Relationship from 'modules/relationship/model'
import View from 'modules/view/model'
import viewCompute from 'modules/view/mutation/compute'
import tableCompute from 'modules/table/mutation/compute'

// Compute
export default async function compute({ params: { worksheetId }, auth }) {
  if(authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: worksheetId },
        check: 'isNotEmpty',
        message: 'Invalid worksheetId.'
      },
    ]

    // Validate
    try {
      v.validate(rules)
    } catch (error) {
      throw new ValidationError(error.message)
    }

    try {
      // Mathjs temporary fix until async functions are supported natively
      // See: https://github.com/josdejong/mathjs/issues/1445
      // -------------------------------------------Start--------------------------------------------------
      const mathjs = create(all)
      const createPromise = factory('Promise', ['typed'], ({ typed }) => {
        typed.addType({ name: 'Promise', test: function (x) { return x ? typeof x.then === 'function' && typeof x.catch === 'function' : false } })
        typed.addConversion({ from: 'any', to: 'Promise', convert: x => Promise.resolve(x) })
        return Promise
      })
      const mathFunctionsKeys = ['addScalar', 'multiplyScalar', 'divideScalar', 'subtract']
      let asyncFunctions = [createPromise]
      for(let k of mathFunctionsKeys) {
        asyncFunctions.push(
          factory(k, ['typed', 'Promise'], ({ typed, Promise }) => {
            return typed(k, { 'Promise, Promise': function (xPromise, yPromise) { return Promise.all([xPromise, yPromise]).then(([x, y]) => mathjs[k](x, y)) }})
          })
        )
      }
      mathjs.import(asyncFunctions)
      // --------------------------------------------End---------------------------------------------------

      // Steps
      // 1. Create mark dimensions formulas
      // 2. Create row/col dimensions formulas
      // 3. Create current worksheet register (mark dimension) formula
      // 3. Fetch formulas
      // 2. for each formula
      //  2.1 Get LHS and RHS
      //    2.1.1 Process LHS
      //      2.1.1.1 Create function for mark dimension
      //      2.1.1.2 Execute function to get all affected mark items (registers)
      //    2.1.2 Process RHS
      //      2.2.1.1 Create functions for all the dimensions
      //      2.2.1.2 Execute function to get computed value for the mark item
      //      2.2.1.3 Update mark item value
      // 3. Compute view
      // 4. Compute table

      // 1. Create mark dimension formulas (RHS)
      // Dimensions - find
      const dimensionsMark = await Dimension.find({ isMark: true, userId: auth.user._id })
      for(let d of dimensionsMark) {
        if(d.name) {
          mathjs.import({
            [d.name]: async function () {
              let value = ''

              const params = [...arguments]

              const item = params.pop()

              let itemTargetRelationship = []
              let rhs = []

              // map all the respective dimension item user has provided
              for(let dimensionItems of params) {
                for(let di of await dimensionItems) {
                  itemTargetRelationship.push(di)
                  rhs.push(di)
                }
              }

              // console.log('itemTargetRelationship', itemTargetRelationship)

              // map rest of dimension item except those who's dimension is already mapped
              // map all the current dimensions
              for(let irr of item.relationshipId.relationships) {
                let match = false

                for(let r of rhs) {
                  // console.log('diItem', diItem)
                  if(r.dimensionId._id.toString() === irr.dimensionId._id.toString()) {
                    match = true
                  }
                }

                if (!match) {
                  itemTargetRelationship.push(irr)
                }
              }

              let itemTargetRelationshipIds = itemTargetRelationship.map(i => i._id)

              // console.log(itemTargetRelationshipIds)

              const relationship = await Relationship.findOne({ relationships: { $all: itemTargetRelationshipIds } })
              if(relationship) {
                const item = await Item.findOne({ relationshipId: relationship._id })

                if(item) {
                  value = item.value
                }
              }

              console.log('value', value)

              return value
            },
          })
        }
      }

      // 2. Create row/col dimension formulas (returns list of dimension item ids) (RHS)
      // Dimensions - find
      const dimensionsRC = await Dimension.find({ isMark: false, userId: auth.user._id })
      for(let d of dimensionsRC) {
        if(d.name) {
          mathjs.import({
            [d.name]: async function () {
              let dimensionItems = []

              for (let item of arguments) {
                // Dimension - find one
                const dimension = await Dimension.findOne({ name: d.name, userId: auth.user._id })

                if(dimension) {
                  // Item - find one
                  const dimensionItem = await Item.findOne({ value: item, dimensionId: dimension._id }).populate('dimensionId')

                  dimensionItems.push(dimensionItem)
                }
              }

              return dimensionItems
            },
          })
        }
      }

      // 3. Create current worksheet register (mark dimension) formula (LHS)
      // View - find
      const view = await View.findOne({ worksheetId, userId: auth.user._id }).populate(['dimensionsMark'])
      await Item.update({ dimensionId: view.dimensionsMark[0]._id }, { isComputed: false }, { multi: true })

      const register = `_${ view.dimensionsMark[0].name }_Register`
      mathjs.import({
        [register]: async function () {
          let relationships = []

          let count = 0
          for(let a of arguments) {
            if (!relationships[count]) {
              relationships[count] = []
            }

            for(let id of await a) {
              relationships[count].push(id)
            }

            count++
          }

          const grouped = cartesian(relationships)

          let items = []

          for(let g of grouped) {
            // Relationship - find
            const relationship = await Relationship.find({ relationships: { $all: g }, worksheetId })

            // Item - find
            const matchedItems = await Item
              .find({ relationshipId: { $in: relationship } })
              .populate([{ path: 'relationshipId', populate: 'relationships' }, 'dimensionId'])

            for(let i of matchedItems) {
              items.push(i)
            }
          }

          return items
        },
      })

      // 3. Fetch formulas
      // Formula - find
      const formula = await Formula.findOne({ worksheetId, userId: auth.user._id })

      if(formula && formula.formulas.length > 0) {
        // 2. for each formula
        const formulas = formula.formulas.split('\n')

        for(let f of formulas) {
          //  2.1 Get LHS and RHS
          const sides = f.split('=')

          let lhs = sides[0].trim().replace(view.dimensionsMark[0].name, register)
          console.log('lhs', lhs)

          const items = await mathjs.evaluate(lhs)

          for(let item of items) {
            console.log('------------------------------------')
            let rhs = replaceString(sides[1].trim(), `))`, `), _item)`)
            console.log('rhs', rhs)

            const result = await mathjs.evaluate(rhs, { _item: item })

            console.log('result', result)

            await Item.updateOne({ _id: item._id }, { value: result, isComputed: true })
          }
        }

        // 4. View - compute
        await viewCompute({ params: { worksheetId }, auth })

        // 5. Table - compute
        await tableCompute({ params: { worksheetId }, auth })

        return {
          data: true,
          message: `Formulas were saved successfully.`
        }
      } else {
        return {
          data: null,
          message: `Nothing to compute.`
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }

  throw new AuthError('You are not authorized to perform this action.')
}
