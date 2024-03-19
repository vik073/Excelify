// Imports
import { action, thunk } from 'easy-peasy';

// App imports
import { list, detail } from 'modules/worksheet/api/actions/query';

// worksheet state
export default {
  // worksheet open
  worksheetOpen: thunk(async (actions, worksheet) => {
    actions.worksheetsOpenedSet(worksheet);

    actions.worksheetActiveSet(worksheet._id);
  }),

  //load Permission WorkSheet action 

  loadPermissionWorksheet: thunk(async (actions, worksheet) => {
    console.log('me loading permission')
    actions.permissionWorksheetOpenedSet(worksheet);
    actions.worksheetActiveSet(worksheet._id);
  }),

  // worksheet close
  worksheetClose: thunk(async (actions, worksheetId, { getState }) => {
    console.log(worksheetId);

    let worksheetsOpened = { ...getState().worksheetsOpened };

    delete worksheetsOpened[worksheetId];

    actions.worksheetCloseSet(worksheetsOpened);

    actions.worksheetActiveSet(null);
  }),

  worksheetCloseSet: action((state, worksheetsOpened) => {
    state.worksheetsOpened = { ...worksheetsOpened };

    window.localStorage.setItem(
      'worksheetsOpened',
      JSON.stringify(state.worksheetsOpened)
    );
  }),

  // worksheet active (single)
  worksheetActive: null,

  worksheetActiveSet: action((state, worksheetId) => {
    state.worksheetActive = worksheetId;

    window.localStorage.setItem(
      'worksheetActive',
      JSON.stringify(state.worksheetActive)
    );
  }),

  // worksheets opened (list)
  worksheetsOpened: {},

  worksheetsOpenedSet: action((state, worksheet) => {
    state.worksheetsOpened = {
      ...state.worksheetsOpened,
      [worksheet._id]: worksheet
    };

    window.localStorage.setItem(
      'worksheetsOpened',
      JSON.stringify(state.worksheetsOpened)
    );
  }),

  //set PermsissionWorksheet to open
  permissionworksheetOpened: [],

  permissionWorksheetOpenedSet: action((state, worksheet) => {
    state.permissionWorksheetOpened = {
      ...state.permissionWorksheetOpened,
      worksheet
    };

    window.localStorage.setItem(
      'permissionWorksheetsOpened',
      JSON.stringify(state.permissionWorksheetOpened)
    );
  }),


  worksheetsRestore: action(state => {
    try {
      const worksheetsOpened = window.localStorage.getItem('worksheetsOpened');
      const worksheetActive = window.localStorage.getItem('worksheetActive');
      const permissionWorksheet = window.localStorage.getItem('permissionWorksheetsOpened');


      if (worksheetsOpened) {
        state.worksheetsOpened = JSON.parse(worksheetsOpened);
      }
      if (worksheetActive) {
        state.worksheetActive = JSON.parse(worksheetActive);
      }
      if (permissionWorksheet) {
        state.permissionWorksheetOpened = JSON.parse(permissionWorksheet);
      }
    } catch (error) {
      console.log(error);
    }
  }),

  // worksheet create show
  worksheetCreateShow: false,

  worksheetCreateShowSet: action((state, worksheetCreateShow) => {
    state.worksheetActive = null;

    state.worksheetCreateShow = worksheetCreateShow;
  }),

  // worksheet list loading
  worksheetListLoading: false,

  worksheetListLoadingSet: action((state, worksheetListLoading) => {
    state.worksheetListLoading = worksheetListLoading;
  }),

  // worksheet list
  worksheetList: [],
  worksheetListSet: action((state, worksheetList) => {
    state.worksheetList = worksheetList;
  }),

  worksheetListGet: thunk(async actions => {
    actions.worksheetListLoadingSet(true);

    try {
      const { data } = await list();

      if (data.success) {
        actions.worksheetListSet(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      actions.worksheetListLoadingSet(false);
    }
  }),

  // worksheet detail
  worksheetDetail: {},

  worksheetDetailSet: action((state, worksheet) => {
    state.worksheetDetail = {
      ...state.worksheetDetail,
      [worksheet.worksheet._id]: worksheet
    };
  }),

  worksheetDetailGet: thunk(async (actions, worksheetId) => {
    try {
      const { data } = await detail(worksheetId);

      if (data.success) {
        console.log(data)
        actions.worksheetDetailSet(data.data);
      } else {
        actions.worksheetClose(worksheetId);
      }
    } catch (error) {
      console.log(error);
    }
  }),

  // worksheet detail settings
  worksheetDetailSettings: {},

  worksheetDetailSettingsSet: action((state, { worksheetId, settings }) => {
    state.worksheetDetailSettings = {
      ...state.worksheetDetailSettings,
      [worksheetId]: settings
    };
  })
};
