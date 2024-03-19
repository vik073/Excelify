// Imports
import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';

// UI imports
import { Text, Select } from 'ui/Input';
import Button from 'ui/Button';
import './style.css';

// App imports
import params from 'setup/config/params';
import { create as worksheetCreate } from 'modules/worksheet/api/actions/mutation';
import { createPermissions } from 'modules/worksheet/api/actions/mutation';
import Typography from 'ui/Typography';
import { addPermissionMarkItem } from '../../../../worksheet/api/actions/mutation';

// Component
const Create = ({ showWorksheetCreateToggle }) => {
  // state
  const [isSubmitting, isSubmittingToggle] = useState(false);
  const [worksheet, setWorksheet] = useState({
    name: '',
    template: params.worksheet.templates.empty.key
  });
  const [permissionWorksheet, setPermissionWorksheet] = useState({
    name: 'permissionWorksheet',
    template: params.worksheet.templates.empty.key,
    dimensionname: ''
  });

  // actions
  const messageShow = useStoreActions(actions => actions.common.messageShow);
  const worksheetCreateShowSet = useStoreActions(
    actions => actions.worksheet.worksheetCreateShowSet
  );
  const worksheetOpen = useStoreActions(
    actions => actions.worksheet.worksheetOpen
  );

  const worksheetDetailGet = useStoreActions(
    actions => actions.worksheet.worksheetDetailGet
  );

  const loadPermissionWorksheet = useStoreActions(
    actions => actions.worksheet.loadPermissionWorksheet
  );
  const worksheetListGet = useStoreActions(
    actions => actions.worksheet.worksheetListGet
  );

  // Update item data
  const createpermissionWorksheet = async sheet => {
    console.log(sheet, 'item');
    try {
      setPermissionWorksheet;
      const { data } = await createPermissions(sheet);

      if (data.success) {
        messageShow({ success: data.success, message: 'hello g' });
        loadPermissionWorksheet(data.data);
        worksheetDetailGet(data.data._id);
      }
    } catch (e) {
      messageShow({ success: false, message: e.message });
      console.log(`Error ${e.message}`);
    }
  };

  // submit form
  const onSubmit = async event => {
    event.preventDefault();

    isSubmittingToggle(true);

    try {
      setWorksheet;

      const { data } = await worksheetCreate(worksheet);
      isSubmittingToggle(false);
      await createpermissionWorksheet(permissionWorksheet);
      messageShow({ success: data.success, message: data.message });

      if (data.success) {
        worksheetCreateShowSet(false);

        // const permissionSheetid = JSON.parse(localStorage.getItem('permissionWorksheetsOpened'));
        // var worksheetId = permissionSheetid.worksheet._id
        // var markid = data.data.name
        // const { pdata } = await addPermissionMarkItem({
        //   worksheetId,
        //   markid
        // })
        //await worksheetDetailGet(worksheetId);

        worksheetOpen(data.data);

        worksheetListGet();
      }
    } catch (e) {
      isSubmittingToggle(false);

      messageShow({
        success: false,
        message: e.message
      });
    }
  };

  // on change input
  const onChange = event => {
    const { name, value } = event.target;
    setWorksheet({ ...worksheet, [name]: value });
    setPermissionWorksheet({ ...permissionWorksheet, dimensionname: value });
    console.log(permissionWorksheet, 'kjjk');
  };

  // return
  return (
    <div className="worksheet-create">
      <Typography variant="secondary" weight="medium">
        Create new worksheet
      </Typography>

      <form onSubmit={onSubmit} className="mt-4">
        {/* input - name */}
        <Text
          label="Name"
          name="name"
          placeholder="Enter worksheet name"
          value={worksheet.name}
          onChange={onChange}
          required
          autoFocus
        />

        {/* input - template */}
        <Select
          name="template"
          value={worksheet.template}
          onChange={onChange}
          label="Template"
          fullWidth
          required
        >
          <option value="">Select template</option>
          {Object.values(params.worksheet.templates).map(type => (
            <option key={type.key} value={type.key}>
              {type.title}
            </option>
          ))}
        </Select>

        <div className="buttons">
          <Button
            type="submit"
            title="Create"
            iconLeft="check"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            size="s"
          />

          <Button
            type="button"
            title="Cancel"
            variant="text"
            size="s"
            onClick={() => worksheetCreateShowSet(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Create;
