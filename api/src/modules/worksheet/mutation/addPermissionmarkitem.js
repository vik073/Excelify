// App imports
import { authCheck, getRandomColor } from 'setup/helpers/utils'
import params from 'setup/config/params'
import v from 'setup/helpers/validation'
import { AuthError, ValidationError } from 'modules/common/errors'
import View from 'modules/view/model'
import Item from 'modules/item/model'
import Dimension from 'modules/dimension/model'
import Relationship from 'modules/relationship/model'
import Worksheet from 'modules/worksheet/model'
import viewCompute from 'modules/view/mutation/compute'
import tableCompute from 'modules/table/mutation/compute'
import dimensionMap from 'modules/worksheet/mutation/dimensionMap'
import generateMarkItems from "modules/worksheet/mutation/generateMarkItems";

// Expand
export default async function addPermissionmarkitem({ worksheetId, dimensionname, auth }) {
    console.log(worksheetId, 'njhh')


    try {



        const worksheetDetails = await Worksheet.findOne({ _id: worksheetId })
        const permissionDimensionId = worksheetDetails['dimensions'][0]
        console.log(worksheetDetails['dimensions'][0], 'workdejtails')

        const sequence = await Item.countDocuments({
            dimensionId: permissionDimensionId
        });

        const count = sequence - 1;
        console.log(count, 'me va countd')

        const dimensionItemPrevious = await Item.findOne({
            sequence: count,
            dimensionId: permissionDimensionId,
        });
        console.log(dimensionItemPrevious)

        // 1b. dimension item create
        const dimensionItemCurrent = await Item.create({
            dimensionId: permissionDimensionId,
            sequence,
            value: auth.user.email
        });


        const view = await View.findOne({
            worksheetId: worksheetId,
            userId: auth.user._id
        });
        console.log(view)

        // 3a. generate new marks for the new dimension added
        await generateMarkItems({
            view,
            itemPrevious: dimensionItemPrevious,
            itemCurrent: dimensionItemCurrent,
            value: dimensionname
        });





        // 4. View - compute
        await viewCompute({ params: { worksheetId: worksheetId }, auth });

        // 5. Table - compute
        await tableCompute({ params: { worksheetId: worksheetId }, auth });

        return {
            data: "success",
            message: `Dimension has been created.`
        }
    } catch (error) {
        console.log(error)
        throw new Error(`An error occurred. ${error.message}`)
    }
}
