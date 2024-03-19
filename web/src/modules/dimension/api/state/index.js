// Imports
import { action, thunk } from 'easy-peasy';

// App imports
import { list } from 'modules/dimension/api/actions/query';

// dimension state
export default {
  // dimension list loading
  dimensionListLoading: false,

  dimensionListLoadingSet: action((state, dimensionListLoading) => {
    state.dimensionListLoading = dimensionListLoading;
  }),

  // dimension list
  dimensionList: [],

  dimensionListSet: action((state, dimensionList) => {
    state.dimensionList = dimensionList;
  }),

  dimensionListGet: thunk(async actions => {
    actions.dimensionListLoadingSet(true);

    try {
      const { data } = await list();

      if (data.success) {
        actions.dimensionListSet(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      actions.dimensionListLoadingSet(false);
    }
  })
};
