// Imports
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

// App Imports
import { routes } from 'setup/routes';

// Component
const AuthCheck = () => {
  const { isAuthenticated } = useStoreState(state => state.user.auth);

  return isAuthenticated ? <Redirect to={routes.userWorkspace.path} /> : '';
};

export default AuthCheck;
