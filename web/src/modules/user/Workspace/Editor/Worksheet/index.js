  // Imports
import React, { Fragment, useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Tooltip from 'react-tooltip-lite';
import Hotkeys from 'react-hot-keys';

// UI imports
import Loader from 'ui/Loader';
import ButtonIcon from 'ui/ButtonIcon';
import { Text } from 'ui/Input';
import Button from 'ui/Button';
import Icon from 'ui/Icon';
import './style.css';

// App imports
import params from 'setup/config/params';
import {
  expandDimension as worksheetExpandDimension,
  expandDimensionItem as worksheetExpandDimensionItem,
  update as worksheetUpdate
} from 'modules/worksheet/api/actions/mutation';
import { saveConfig as viewSaveConfig } from 'modules/view/api/actions/mutation';
import { update as dimensionUpdate } from 'modules/dimension/api/actions/mutation';
import { update as itemUpdate } from 'modules/item/api/actions/mutation';
import Input from 'modules/user/Workspace/Editor/Worksheet/Input';
import Dimensions from 'modules/user/Workspace/Editor/Worksheet/Dimensions';
import FormulaEditor from 'modules/user/Workspace/Editor/Worksheet/FormulaEditor';
import Typography from 'ui/Typography';
import { addPermissionMarkItem } from '../../../../worksheet/api/actions/mutation';

// Component
const Worksheet = ({ worksheetId, Ispermission }) => {
  // state
  const [focused, setFocused] = useState(null);
  const [isExpandingDimension, isExpandingDimensionToggle] = useState(false);
  const [isExpandingItem, isExpandingItemToggle] = useState(false);
  const [isDimensionUpdating, isDimensionUpdatingToggle] = useState(false);
  const [isSubmittingWorksheet, isSubmittingWorksheetToggle] = useState(false);
  const [worksheet, setWorksheet] = useState({ name: '' });
  const worksheetDetail = useStoreState(
    state => state.worksheet.worksheetDetail
  );
  const worksheetDetailSettings = useStoreState(
    state => state.worksheet.worksheetDetailSettings
  );
  const worksheetActive = useStoreState(
    state => state.worksheet.worksheetActive
  );

  // actions
  const messageShow = useStoreActions(actions => actions.common.messageShow);
  const worksheetDetailGet = useStoreActions(
    actions => actions.worksheet.worksheetDetailGet
  );
  const worksheetDetailSettingsSet = useStoreActions(
    actions => actions.worksheet.worksheetDetailSettingsSet
  );
  const dimensionListGet = useStoreActions(
    actions => actions.dimension.dimensionListGet
  );
  const worksheetListGet = useStoreActions(
    actions => actions.worksheet.worksheetListGet
  );
  const worksheetClose = useStoreActions(
    actions => actions.worksheet.worksheetClose
  );
  const worksheetActiveSet = useStoreActions(
    actions => actions.worksheet.worksheetActiveSet
  );
  const permissionWorksheetOpened = useStoreState(
    state => state.worksheet.permissionWorksheetOpened
  );

  // console.log(worksheetDetail)

  // on load
  useEffect(() => {
    refresh();

    if (!worksheetDetailSettings[worksheetId]) {
      worksheetDetailSettingsSet({
        worksheetId,
        settings: { view: 'viewDataModel', showFormulaEditor: false }
      });
    }
  }, []);

  // refresh
  const refresh = async () => {
    await worksheetDetailGet(worksheetId);
  };

  // on set worksheet view
  const onSetWorksheetView = view => async () => {
    const settings = worksheetDetailSettings[worksheetId];
    settings.view = view;

    worksheetDetailSettingsSet({ worksheetId, settings });
  };

  // showFormulaEditorToggle
  const onFormulaEditorToggle = () => {
    const settings = worksheetDetailSettings[worksheetId];
    settings.showFormulaEditor = !worksheetDetailSettings[worksheetId]
      .showFormulaEditor;

    worksheetDetailSettingsSet({ worksheetId, settings });
  };

  // expand dimension
  const expandDimension = axis => async () => {
    isExpandingDimensionToggle(true);

    try {
      // Worksheet - expand
      const { data } = await worksheetExpandDimension(worksheetId, axis);

      if (data.success) {
        // View
        await refresh();

        await dimensionListGet();
      }
    } catch (e) {
      console.log(`Error ${e.message}`);
    } finally {
      isExpandingDimensionToggle(false);
    }
  };

  // expand item
  const expandItem = (item, value) => async event => {
    console.log(item);
    if (

      focused &&
      item.axis !== params.common.axis.mark.key
    ) {
      isExpandingItemToggle(true);

      try {
        // Worksheet - expand
        const { data } = await worksheetExpandDimensionItem({
          dimensionItem: item,
          value
        });

        if (data.success) {
          await refresh();
        }
      } catch (e) {
        console.log(`Error ${e.message}`);
      } finally {
        isExpandingItemToggle(false);
      }
    }
  };

  // Update item data
  const updateItem = async (item, value, IsPermission) => {
    console.log(item, 'item')
    console.log(IsPermission, 'dink')
    if (item.value !== value) {
      // update only if value changes
      try {
        const { data } = await itemUpdate({
          worksheetId,
          dimensionId: item.dimensionId,
          itemId: item._id,
          value
        });

        if (data.success) {
          if (IsPermission == 'true') {
            await refresh();
          }

        }
        if (!data.success && IsPermission == 'true') {
          console.log('jkj')
          messageShow({ success: data.success, message: data.message });
          await refresh();
        }
      } catch (e) {
        if (IsPermission == 'true') {
          console.log('jkj')
          messageShow({ success: false, message: 'try with valid user' });
          await refresh();
        }

        console.log(`Error ${e.message}`);
      }
    }
  };

  // Update item data
  const updateDimension = (dimensionId, name, markItem) => async event => {
    if (event.target.value && event.target.value !== name) {
      try {
        const { data } = await dimensionUpdate({
          dimensionId,
          name: event.target.value
        })

        messageShow({ success: data.success, message: data.message });
        if (data.success) {

          await refresh();

        }

        await refresh();

        await dimensionListGet();
      } catch (e) {
        console.log(`Error ${e.message}`);
      }
    }
  };

  // dimension update
  const onDimensionUpdate = async ({ dimensionsRow, dimensionsCol }) => {
    isDimensionUpdatingToggle(true);

    try {
      await viewSaveConfig({
        viewId: worksheetDetail[worksheetId].view._id,
        dimensionsRow: dimensionsRow.map(r => r._id),
        dimensionsCol: dimensionsCol.map(c => c._id),
        dimensionsMark: worksheetDetail[worksheetId].view.dimensionsMark
      });

      await refresh();
    } catch (e) {
      console.log(`Error ${e.message}`);

      messageShow({
        success: false,
        message: 'There was some error, please try again.'
      });
    } finally {
      isDimensionUpdatingToggle(false);
    }
  };

  // on save settings
  const onSaveWorksheet = async event => {
    event.preventDefault();

    isSubmittingToggle(true);

    try {
      const { data } = await worksheetUpdate(worksheet);

      isSubmittingWorksheetToggle(false);

      messageShow({ success: data.success, message: data.message });

      if (data.success) {
        worksheetListGet();
      }
    } catch (e) {
      isSubmittingWorksheetToggle(false);

      messageShow({
        success: false,
        message: 'There was some error. Please try again'
      });
    }
  };

  // on change input
  const onChange = event => {
    const { name, value } = event.target;
    setWorksheet({ ...worksheet, [name]: value });
  };

  // onKeyUp
  const onKeyDown = (keyName, e) => {
    e.preventDefault();

    console.log(keyName);

    // console.log("test:onKeyUp", e, handle)

    switch (keyName) {
      case 'command+shift+1':
        onSetWorksheetView('viewDataModel')();
        break;

      case 'command+shift+2':
        onSetWorksheetView('viewDataList')();
        break;

      case 'command+shift+f':
        onFormulaEditorToggle();
        break;
    }
  };

  // on worksheet close
  const onWorksheetClose = worksheetId => () => {
    worksheetClose(worksheetId);
  };

  const onFocusWorksheet = () => {
    worksheetActiveSet(worksheetId);
  };

  // render
  return (
    <>
      {worksheetDetail &&
        worksheetDetail[worksheetId] &&
        worksheetDetail[worksheetId].worksheet &&
        worksheetDetailSettings[worksheetId] &&
        worksheetDetailSettings[worksheetId].view ? (
          <div
            className={`worksheet ${
              worksheetActive === worksheetId ? 'active' : ''
              }`}
            onClick={onFocusWorksheet}
          >
            {/* header */}
            <div className="worksheet-header">
              <Icon
                name="close"
                size="s"
                onClick={onWorksheetClose(worksheetId)}
              />

              <Typography size="h5">
                {worksheetDetail[worksheetId].worksheet.name}
              </Typography>
            </div>

            {/* content */}
            <div className="worksheet-content">
              {/* toolbar */}
              {
                Ispermission === 'false' && (

                  <div className="toolbar">
                    <Tooltip content="Switch to Data Model view" hoverDelay={750}>
                      <ButtonIcon
                        icon="view_quilt"
                        onClick={onSetWorksheetView('viewDataModel')}
                        className={
                          worksheetDetailSettings[worksheetId].view ===
                            'viewDataModel'
                            ? 'active'
                            : ''
                        }
                      />
                    </Tooltip>

                    <Tooltip content="Switch to Data List view" hoverDelay={750}>
                      <ButtonIcon
                        icon="view_list"
                        onClick={onSetWorksheetView('viewDataList')}
                        className={
                          worksheetDetailSettings[worksheetId].view === 'viewDataList'
                            ? 'active'
                            : ''
                        }
                      />
                    </Tooltip>

                    <Tooltip content={`Toggle Formula editor`} hoverDelay={750}>
                      <ButtonIcon
                        icon="functions"
                        onClick={onFormulaEditorToggle}
                        className={
                          worksheetDetailSettings[worksheetId].showFormulaEditor
                            ? 'active'
                            : ''
                        }
                      />
                    </Tooltip>


                    {/*
                      <Tooltip content={`Settings`} hoverDelay={750}>
                        <ButtonIcon
                          icon='settings'
                          onClick={onSetWorksheetView('viewWorksheet')}
                          className={worksheetDetailSettings[worksheetId].view === 'viewWorksheet' ? 'active' : '' }
                        />
                      </Tooltip>
                      */}
                  </div>
                )}

              {/* work-area */}
              <div className="work-area">
                {/* sheet */}
                <div className="sheet">
                  {/* dimensions */}
                  {worksheetDetail[worksheetId].view && (
                    <Dimensions Ispermission={Ispermission}
                      dimensionsRowInitial={
                        worksheetDetail[worksheetId].view.dimensionsRow
                      }
                      dimensionsColInitial={
                        worksheetDetail[worksheetId].view.dimensionsCol
                      }
                      dimensionsMarkInitial={
                        worksheetDetail[worksheetId].view.dimensionsMark
                      }
                      updateDimension={updateDimension}
                      dimensionUpdate={onDimensionUpdate}
                      expandDimension={expandDimension}
                      isExpandingDimension={isExpandingDimension}
                    />
                  )}


                  {/* matrix */}
                  <div
                    className="matrix"
                    key={worksheetDetail[worksheetId].timestamp}
                  >
                    {
                      {
                        // View data model
                        viewDataModel: (
                          <div key="view-data-model" className="view-data-model">
                            <table>
                              <tbody>
                                {worksheetDetail[worksheetId].view &&
                                  worksheetDetail[worksheetId].view.matrix.map(
                                    (row, r) => (
                                      <tr key={r}>
                                        {row.map((col, c) =>
                                          col && col._id ? (
                                            !col.hidden ? (
                                              <Input
                                                key={`${col._id}-${r}-${c}`}
                                                id={`${col._id}-${r}-${c}`}
                                                col={col}
                                                expandItem={expandItem}
                                                Ispermission={Ispermission}
                                                updateItem={updateItem}
                                                focused={focused}
                                                setFocused={setFocused}
                                                isExpandingItem={
                                                  isExpandingItem ||
                                                  isExpandingDimension ||
                                                  isDimensionUpdating
                                                }
                                                axis={col.axis}
                                                rowSpan={col.spanRow}
                                                colSpan={col.spanCol}
                                              />
                                            ) : null
                                          ) : r === 0 && c === 0 ? (
                                            <td
                                              key={`grey-${r}-${c}`}
                                              className="cell-grey"
                                              rowSpan={
                                                worksheetDetail[worksheetId].view
                                                  .dimensionsCol.length
                                              }
                                              colSpan={
                                                worksheetDetail[worksheetId].view
                                                  .dimensionsRow.length
                                              }
                                            />
                                          ) : null
                                        )}
                                      </tr>
                                    )
                                  )}
                              </tbody>
                            </table>
                          </div>
                        ),

                        // View data list
                        viewDataList: (
                          <div key="view-data-list" className="view-data-list">
                            <table>
                              {worksheetDetail[worksheetId].table &&
                                worksheetDetail[worksheetId].table.view &&
                                worksheetDetail[worksheetId].table.view.length >
                                0 && (
                                  <Fragment>
                                    <thead>
                                      <tr>
                                        {worksheetDetail[
                                          worksheetId
                                        ].table.view[0].map(r => (
                                          <th key={`thead-row-${r._id}`}>
                                            {r.value}
                                          </th>
                                        ))}
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {[
                                        ...worksheetDetail[worksheetId].table.view
                                      ]
                                        .splice(1)
                                        .map((r, i) => (
                                          <tr key={`tbody-row-${i}`}>
                                            {r.map(c => (
                                              <td key={`tbody-col-${i}-${c._id}`}>
                                                {c.value}
                                              </td>
                                            ))}
                                          </tr>
                                        ))}
                                    </tbody>
                                  </Fragment>
                                )}
                            </table>
                          </div>
                        ),

                        // View update
                        viewWorksheet: (
                          <div key="view-update" className="view-worksheet">
                            <form
                              onSubmit={onSaveWorksheet}
                              className="animation grow-in"
                            >
                              {/* input - name */}
                              <Text
                                label="Worksheet Name"
                                name="name"
                                placeholder="Enter worksheet name"
                                value={worksheet.name}
                                onChange={onChange}
                                required
                                autoFocus
                              />

                              {/* actions */}
                              <div className="buttons">
                                <Button
                                  type="submit"
                                  title="Update"
                                  iconLeft="check"
                                  isLoading={isSubmittingWorksheet}
                                  disabled={isSubmittingWorksheet}
                                  size="s"
                                />
                              </div>
                            </form>
                          </div>
                        )
                      }[worksheetDetailSettings[worksheetId].view]
                    }
                  </div>
                </div>

                {/* formula */}
                {worksheetDetailSettings[worksheetId].showFormulaEditor && (
                  <FormulaEditor
                    worksheetId={worksheetId}
                    formulasInitial={
                      worksheetDetail[worksheetId] &&
                      worksheetDetail[worksheetId].formula &&
                      worksheetDetail[worksheetId].formula.formulas
                    }
                    onClose={onFormulaEditorToggle}
                    refresh={refresh}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
    </>
  );
};
export default Worksheet;
