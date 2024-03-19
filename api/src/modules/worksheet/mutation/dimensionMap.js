// App imports'
import Worksheet from 'modules/worksheet/model'

// Dimension map
export default async function dimensionMap({ worksheetId, dimensionId }) {
  const worksheet = await Worksheet.findOne({ _id: worksheetId })

  if (worksheet) {
    const dimensions = worksheet.dimensions

    if(dimensions.indexOf(dimensionId) === -1) {
      // Worksheet - update
      await Worksheet.updateOne({ _id: worksheetId }, { $push: { dimensions: dimensionId } })
    }
  }
}
