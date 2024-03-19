// Imports
import React from 'react';
import { useStoreState } from 'easy-peasy';

// UI Imports
import Toast from 'ui/Toast';

// App Imports
// import { messageHide } from 'modules/common/api/actions'

// Component
const Notification = () => {
  // state
  const { open, success, message } = useStoreState(
    state => state.common.message
  );
  // const dispatch = useDispatch()

  return (
    open && (
      <Toast
        success={success}
        message={message} /* onClick={() => dispatch(messageHide())} */
      />
    )
  );
};

export default Notification;
