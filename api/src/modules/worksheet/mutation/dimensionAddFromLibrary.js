// App imports
import { authCheck, getRandomColor } from "setup/helpers/utils";
import params from "setup/config/params";
import v from "setup/helpers/validation";
import { AuthError, ValidationError } from "modules/common/errors";
import View from "modules/view/model";
import Item from "modules/item/model";
import Dimension from "modules/dimension/model";
import Relationship from "modules/relationship/model";
import viewCompute from "modules/view/mutation/compute";
import tableCompute from "modules/table/mutation/compute";
import generateMarkItems from "modules/worksheet/mutation/generateMarkItems";
import dimensionMap from "modules/worksheet/mutation/dimensionMap";

// Dimension Add From Library
export default async function dimensionAddFromLibrary({
  params: { worksheetId, dimensionId },
  auth
}) {
  if (authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: worksheetId },
        check: "isNotEmpty",
        message: "Invalid worksheet."
      },
      {
        data: { value: dimensionId },
        check: "isNotEmpty",
        message: "Invalid dimension."
      }
    ];

    // Validate
    try {
      v.validate(rules);
    } catch (error) {
      throw new ValidationError(error.message);
    }

    try {
      // 1. Add the selected libraryDimension to the active worksheet

      // View - find
      let view = await View.findOne({ worksheetId, userId: auth.user._id });
      // add dimension to Row (as default)
      let dimensionsRow = view.dimensionsRow;
      dimensionsRow.push(dimensionId);
      // View - update
      await View.updateOne({ _id: view._id }, { dimensionsRow });
      //
      // @todo - BS: is this const needed if defined already above?
      const dimension = await Dimension.findOne({
        _id: dimensionId,
        userId: auth.user._id
      });
      const dimensionItems = await Item.find({ dimensionId: dimension._id });

      // 2. add relationships for markItems to the libraryDimensionItems
      for (let i = 0; i < dimensionItems.length; i++) {
        // for the first dimension item, push to all marks
        if (i === 0) {
          // Relationship - update
          await Relationship.updateMany(
            { worksheetId },
            { $push: { relationships: dimensionItems[i]._id } },
            { multi: true }
          );
          // for the ...remaining dimension items, generate new markItems
        } else {
          // View - find
          view = await View.findOne({ _id: view._id });

          await generateMarkItems({
            view,
            itemPrevious: dimensionItems[i - 1],
            itemCurrent: dimensionItems[i]
          });
        }

        // Compute view
        await viewCompute({ params: { worksheetId }, auth });
      }

      // Map libraryDimension to worksheet
      await dimensionMap({ worksheetId, dimensionId: dimension._id });

      // Compute table @todo
      // await tableCompute({ params: { worksheetId }, auth })

      return {
        data: dimension,
        message: `Dimension has been created.`
      };
    } catch (error) {
      console.log(error);
      throw new Error(`An error occurred. ${error.message}`);
    }
  }

  throw new AuthError("You are not authorized to perform this action.");
}
