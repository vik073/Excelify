// Imports
import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Helmet from 'react-helmet';
import chunk from 'lodash/chunk';
import Modal from 'react-modal';

// UI imports
import Typography from 'ui/Typography';
import Icon from 'ui/Icon';
import './style.css';

// App imports
import params from 'setup/config/params';
import { useWindowSize } from 'setup/hooks';
import Header from 'modules/user/Workspace/Editor/Header';
import Browser from 'modules/user/Workspace/Editor/Browser';
import WorksheetCreate from 'modules/user/Workspace/Editor/WorksheetCreate';
import Worksheet from 'modules/user/Workspace/Editor/Worksheet';

// Component
const Editor = () => {
  // state
  const worksheetsOpened = useStoreState(
    state => state.worksheet.worksheetsOpened
  );
  const permissionWorksheetOpened = useStoreState(
    state => state.worksheet.permissionWorksheetOpened
  );
  const worksheetCreateShow = useStoreState(
    state => state.worksheet.worksheetCreateShow
  );
  const size = useWindowSize();

  // actions
  const worksheetOpen = useStoreActions(
    actions => actions.worksheet.worksheetOpen
  );

  const worksheetCreateShowSet = useStoreActions(
    actions => actions.worksheet.worksheetCreateShowSet
  );
  const worksheetsRestore = useStoreActions(
    actions => actions.worksheet.worksheetsRestore
  );

  const loadPermissionWorksheet = useStoreActions(
    actions => actions.worksheet.loadPermissionWorksheet
  );




  const createPermissionWorksheet = useStoreActions(
    actions => actions.worksheet.permissionWorksheetCreate
  );
  useEffect(() => {
    worksheetsRestore();
  }, []);

  // on select worksheet
  const onSelectWorksheet = worksheet => () => {
    worksheetCreateShowSet(false);

    worksheetOpen(worksheet);
  };

  // render
  return (
    <div className="user-workspace-editor animation fade-in">
      {/* meta */}
      <Helmet>
        <title>{`Editor - Workspace - ${params.site.name}`}</title>
      </Helmet>

      {/* header */}
      <Header />

      {/* content */}
      <div className="pane">
        {/* browser */}
        <Browser />


        {/* sheets */}
        <div className="sheets">
          {chunk(
            Object.values(worksheetsOpened),
            Math.ceil(size.width / 1000)
          ).map((worksheets, i) => (
            <div key={i} className="row">
              {worksheets.map(w => (
                <div key={w._id} className="col">
                  <Worksheet key={w._id} Ispermission={'false'} worksheetId={w._id} />
                </div>
              ))}
            </div>
          ))}


          {permissionWorksheetOpened !== undefined && (
            <div key={permissionWorksheetOpened['worksheet']._id} className="col">
              <Worksheet key={permissionWorksheetOpened['worksheet']._id} Ispermission={'true'} worksheetId={permissionWorksheetOpened['worksheet']._id} />

            </div>
          )}


        </div>
      </div>

      {/* modal - qr code */}
      <Modal
        isOpen={worksheetCreateShow}
        onRequestClose={() => worksheetCreateShowSet(false)}
        contentLabel="Worksheet Create"
        ariaHideApp={false}
        id="worksheet-create"
      >
        <WorksheetCreate />
      </Modal>
      {/* header */}
    </div>
  );
};

export default Editor;
