// Imports
import React, { useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

// UI imports
import Typography from 'ui/Typography';
import Button from 'ui/Button';
import Loader from 'ui/Loader';
import Icon from 'ui/Icon';
import './style.css';

// App imports
import { dimensionAddFromLibrary } from 'modules/worksheet/api/actions/mutation';

// Component
const Editor = ({ }) => {
  // state
  const [isAddDimensionFromLibrary, isAddDimensionFromLibraryToggle] = useState(
    false
  );
  const worksheetList = useStoreState(state => state.worksheet.worksheetList);
  const worksheetListLoading = useStoreState(
    state => state.worksheet.worksheetListLoading
  );
  const dimensionList = useStoreState(state => state.dimension.dimensionList);
  const dimensionListLoading = useStoreState(
    state => state.dimension.dimensionListLoading
  );
  const worksheetActive = useStoreState(
    state => state.worksheet.worksheetActive
  );
  const worksheetDetail = useStoreState(
    state => state.worksheet.worksheetDetail
  );

  // actions
  const messageShow = useStoreActions(actions => actions.common.messageShow);
  const worksheetsOpened = useStoreState(
    state => state.worksheet.worksheetsOpened
  );
  const worksheetOpen = useStoreActions(
    actions => actions.worksheet.worksheetOpen
  );

  // action to load permission worksheet onclick side bar 
  const loadPermissionWorksheet = useStoreActions(
    //  
    actions => actions.worksheet.loadPermissionWorksheet
  );

  //
  const worksheetCreateShowSet = useStoreActions(
    actions => actions.worksheet.worksheetCreateShowSet
  );
  const worksheetListGet = useStoreActions(
    actions => actions.worksheet.worksheetListGet
  );
  const dimensionListGet = useStoreActions(
    actions => actions.dimension.dimensionListGet
  );
  const worksheetDetailGet = useStoreActions(
    actions => actions.worksheet.worksheetDetailGet
  );

  // on load
  useEffect(() => {
    (async () => {
      // worksheets
      await worksheetListGet();

      // dimensions
      await dimensionListGet();
    })();
  }, []);

  // on open worksheet
  const onWorksheetOpen = worksheet => () => {
    if (worksheet.name == 'permissionWorksheet') {
      loadPermissionWorksheet(worksheet)
    }
    else {
      worksheetOpen(worksheet);
    }

  };

  // dimension Add To Worksheet
  const dimensionAddToWorksheet = dimension => async () => {
    if (
      worksheetDetail[worksheetActive].worksheet.dimensions.indexOf(
        dimension._id
      ) === -1
    ) {
      // not in there
      isAddDimensionFromLibraryToggle(true);

      let check = window.confirm(
        `Are you sure you want to add ${dimension.name} to selected worksheet?`
      );

      if (check) {
        try {
          // Worksheet - dimensionAddFromLibrary
          const { data } = await dimensionAddFromLibrary(
            worksheetActive,
            dimension._id
          );

          messageShow({ success: data.success, message: data.message });

          if (data.success) {
            await worksheetDetailGet(worksheetActive);
          }
        } catch (error) {
          console.log(`Error ${error.message}`);

          messageShow({ success: false, message: error.message });
        } finally {
          isAddDimensionFromLibraryToggle(false);
        }
      }
    } else {
      messageShow({
        success: false,
        message: `${dimension.name} is already added to the selected worksheet.`
      });
    }
  };

  // render
  return (
    <div className="browser">
      {/* worksheets */}
      <div className="section worksheets">
        {/* title */}
        <div className="title">
          <Typography size="h5" weight="medium" variant="secondary">
            Worksheets
          </Typography>
        </div>

        {/* list */}
        <div className="list">
          {worksheetListLoading ? (
            <Loader message="loading worksheets..." />
          ) : worksheetList.length ? (
            worksheetList.map(w => (
              <div
                key={w._id}
                className={`item ${worksheetsOpened[w._id] ? 'active' : ''}`}
                onClick={onWorksheetOpen(w)}
              >
                <Icon
                  name={worksheetsOpened[w._id] ? 'folder_open' : 'folder'}
                  size="s"
                />{' '}
                <Typography size="h5">{w.name}</Typography>
              </div>
            ))
          ) : (
                <div className="item-empty">
                  <Button
                    title="Create Worksheet"
                    iconLeft="add"
                    size="s"
                    onClick={() => worksheetCreateShowSet(true)}
                  />
                </div>
              )}
        </div>
      </div>

      {/* dimensions */}
      <div className="section dimensions">
        {/* title */}
        <div className="title">
          <Typography size="h5" weight="medium" variant="secondary">
            Dimensions
          </Typography>
        </div>

        {/* list */}
        <div className="list">
          {dimensionListLoading ? (
            <Loader message="loading dimensions..." />
          ) : dimensionList.length ? (
            dimensionList.map(d => (
              <div
                key={d._id}
                className="item"
                onClick={dimensionAddToWorksheet(d)}
              >
                <Icon name="insert_drive_file" size="s" />{' '}
                <Typography size="h5" className={!d.name ? 'text-dark' : ''}>
                  {d.name || 'No name'}
                </Typography>
              </div>
            ))
          ) : (
                <div className="item-empty">
                  <Typography size="h5" className="text-muted">
                    No dimensions to show.
              </Typography>
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
