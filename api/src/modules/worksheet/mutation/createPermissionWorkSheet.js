import { authCheck, getRandomColor } from "setup/helpers/utils";
import v from "setup/helpers/validation";
import params from "setup/config/params";
import { AuthError, ValidationError } from "modules/common/errors";
import Worksheet from "modules/worksheet/model";
import Dimension from "modules/dimension/model";
import Item from "modules/item/model";
import Relationship from "modules/relationship/model";
import viewSave from "modules/view/mutation/save";
import viewCompute from "modules/view/mutation/compute";
import tableCompute from "modules/table/mutation/compute";
import addPermissionmarkitem from "./addPermissionmarkitem";

// Create Permission Worksheet
export default async function createPermissionWorkSheet({
  params: { _id, name, template, dimensionname },
  auth
}) {
  debugger;
  if (authCheck(auth)) {
    // Validation rules
    const rules = [
      {
        data: { value: name },
        check: "isNotEmpty",
        message: "Invalid name."
      },
      {
        data: { value: template },
        check: "isNotEmpty",
        message: "Invalid template."
      }
    ];

    // Validate
    try {
      v.validate(rules);
    } catch (error) {
      throw new ValidationError(error.message);
    }

    try {
      const fields = { name };

      // Worksheet
      let worksheet;
      if (_id) {
        // update
        worksheet = await Worksheet.updateOne(
          { _id, userId: auth.user._id },
          { $set: fields }
        );
      } else {
        // create
        const check = await Worksheet.countDocuments({ name: name, userId: auth.user._id });
        if (check === 0) {
          worksheet = await Worksheet.create({
            ...fields,
            userId: auth.user._id,
            isDeleted: false
          });
        } else {
          const worksheetDetails = await Worksheet.findOne({ name: 'permissionWorksheet', userId: auth.user._id });
          const dimesnionstatus = await addPermissionmarkitem({
            worksheetId: worksheetDetails._id,
            dimensionname: dimensionname,
            auth: auth
          })
          return {
            success: true,
            data: worksheetDetails,
            // message: `Worksheet "${name}" already exists, please enter different name.`

          }
        }
      }



      if (worksheet) {
        let dimensions = []
        let dimensionsRow = [];
        let dimensionsCol = [];
        let dimensionsMark = [];

        if (template === params.worksheet.templates.empty.key) {
          // empty template
          // Worksheet -> Dimensions and Items (default)
          // Row
          // Dimension row
          const dimensionRow = await Dimension.create({
            userId: auth.user._id,
            name: 'Users',
            color: getRandomColor("dimension row")
          });

          dimensions.push(dimensionRow._id)
          // push dimension

          // Dimension row - Item
          const dimensionRowItem = await Item.create({
            worksheetId: worksheet._id,
            dimensionId: dimensionRow._id,
            sequence: 0,
            value: auth.user.email
          });

          // Mark
          // Dimension mark
          const dimensionRestrictedMarks = await Dimension.create({
            userId: auth.user._id,
            name: 'MarkItems',
            color: "#bbbbbb"
          });

          dimensions.push(dimensionRestrictedMarks._id)

          await Worksheet.updateOne({ _id: worksheet._id }, { dimensions })

          // Dimension - Mark - Item - Relationships
          const dimensionRestrictedMarksRelationship = await Relationship.create(
            {
              worksheetId: worksheet._id,
              relationships: [dimensionRowItem._id]
            }
          );

          // Dimension - Mark - Item
          await Item.create({
            worksheetId: worksheet._id,
            dimensionId: dimensionRestrictedMarks._id,
            relationshipId: dimensionRestrictedMarksRelationship._id,
            value: dimensionname
          });

          // View - Row Dimensions
          dimensionsRow = [dimensionRow._id];

          // View - Mark Dimension
          dimensionsMark = [dimensionRestrictedMarks._id];
        }

        // View - save
        await viewSave({
          params: {
            worksheetId: worksheet._id,
            dimensionsRow,
            dimensionsCol,
            dimensionsMark
          },
          auth
        });

        // View - compute
        await viewCompute({ params: { worksheetId: worksheet._id }, auth });

        // Table - compute
        await tableCompute({ params: { worksheetId: worksheet._id }, auth });
      }

      return {
        data: worksheet,
        message: `Worksheet has been saved successfully.`
      };
    } catch (error) {
      throw new Error(`An error occurred. ${error.message}`);
    }
  }

  throw new AuthError("You are not authorized to perform this action.");
}
