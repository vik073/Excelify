// App imports
import params from 'setup/config/params'
import Item from 'modules/item/model'
import Relationship from 'modules/relationship/model'

// Generate mark items (used in expandItem, dimensionAddFromLibrary)
export default async function generateMarkItems({ view, itemPrevious, itemCurrent, value }) {
  for (let r = 0; r < view.matrix.length; r++) {
    console.log(value, "lklkl")
    for (let c = 0; c < view.matrix[r].length; c++) {
      if (view.matrix[r][c] && view.matrix[r][c].hidden === false && view.matrix[r][c]._id.toString() === itemPrevious._id.toString()) {
        const itemDimensionMatched = view.matrix[r][c]

        let boundRFrom = 0
        let boundRTo = 0
        let boundCFrom = 0
        let boundCTo = 0

        if (itemDimensionMatched.axis === params.common.axis.col.key) { // col
          boundRFrom = view.dimensionsCol.length
          boundRTo = view.matrix.length - 1

          boundCFrom = c
          boundCTo = view.dimensionConfig[itemDimensionMatched.dimensionId].span + c - 1
        } else if (itemDimensionMatched.axis === params.common.axis.row.key) { // row
          boundRFrom = r
          boundRTo = view.dimensionConfig[itemDimensionMatched.dimensionId].span + r - 1

          boundCFrom = view.dimensionsRow.length
          boundCTo = view.matrix[0].length - 1
        }

        // console.log('boundRFrom', boundRFrom, 'boundRTo', boundRTo)
        // console.log('boundCFrom', boundCFrom, 'boundCTo', boundCTo)

        // 3b. bounds indicate the marks to be duplicated as the new marks needed for the new dimension item added
        for (let boundR = boundRFrom; boundR <= boundRTo; boundR++) {
          for (let boundC = boundCFrom; boundC <= boundCTo; boundC++) {
            console.log(boundC)
            // find the next mark item to copy for the new dimension item added
            const itemToDuplicate = await Item
              .findOne({ _id: view.matrix[boundR][boundC]._id })
              .populate('relationshipId')

            // 3c. marks need to inherit new relationships
            // copy its relationships
            let relationships = itemToDuplicate.relationshipId.relationships
            // and replace the relationship for the new dimension item
            relationships[relationships.indexOf(itemDimensionMatched._id)] = itemCurrent._id

            const relationship = await Relationship.create({ worksheetId: view.worksheetId, relationships })

            // now, create the mark item
            await Item.create({
              dimensionId: itemToDuplicate.dimensionId,
              value: value,
              relationshipId: relationship._id
            })
          }
        }
      }
    }
  }
}
