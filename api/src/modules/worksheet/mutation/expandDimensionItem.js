// App imports
import { authCheck } from "setup/helpers/utils";
import v from "setup/helpers/validation";
import { AuthError, ValidationError } from "modules/common/errors";
import View from "modules/view/model";
import Item from "modules/item/model";
import Dimension from "modules/dimension/model";
import Worksheet from "modules/worksheet/model";
import viewCompute from "modules/view/mutation/compute";
import tableCompute from "modules/table/mutation/compute";
import generateMarkItems from "modules/worksheet/mutation/generateMarkItems";

// Expand dimension item
export default async function expandDimensionItem({
  params: { dimensionItem, value },
  auth
}) {
  if (authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: dimensionItem },
        check: "isNotEmpty",
        message: "Invalid dimension item to expand."
      }
    ];

    // Validate
    try {
      v.validate(rules);
    } catch (error) {
      throw new ValidationError(error.message);
    }

    // 1. add a new dimension item with the next sequence,
    // 2. replicate dimension items for those on the same axis
    // 3a. generate new marks for the new dimension added
    // 3b. bounds indicate the marks to be duplicated as the new marks needed for the new dimension item added
    // 3c. marks need to inherit new relationships
    // 4. compute the view
    // 5. compute the table

    try {
      // Item - update
      await Item.updateOne({ _id: dimensionItem._id }, { $set: { value } });

      // Dimension - find
      const dimension = await Dimension.findById(dimensionItem.dimensionId);

      // 1. add a new dimension dimensionItem with the next sequence,

      // 1a. items in dimension (for sequence)
      const sequence = await Item.countDocuments({
        dimensionId: dimension._id
      });

      // 1b. dimension item create
      const dimensionItemCurrent = await Item.create({
        dimensionId: dimension._id,
        sequence,
        value: ""
      });

      // 2. replicate dimension items for those on the same axis -> handled in compute > view

      // find all worksheets with dimension
      const worksheets = await Worksheet.find({
        dimensions: { $in: dimension._id }
      });

      for (let w of worksheets) {
        // View - find
        const view = await View.findOne({
          worksheetId: w._id,
          userId: auth.user._id
        });

        // 3a. generate new marks for the new dimension added
        await generateMarkItems({
          view,
          itemPrevious: dimensionItem,
          itemCurrent: dimensionItemCurrent,
          value: ''
        });

        // 4. View - compute
        await viewCompute({ params: { worksheetId: w._id }, auth });

        // 5. Table - compute
        await tableCompute({ params: { worksheetId: w._id }, auth });
      }

      return {
        success: true,
        data: true,
        message: `Worksheet has been saved successfully.`
      };
    } catch (error) {
      console.log(error);
      throw new Error(`An error occurred. ${error.message}`);
    }
  }
  throw new AuthError("You are not authorized to perform this action.");
}
