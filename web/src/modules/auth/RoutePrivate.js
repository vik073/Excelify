// Imports
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import isArray from 'lodash/isArray';

// App Imports
import { routes } from 'setup/routes';

// Component
const RoutePrivate = ({ component, ...props }) => {
  const { isAuthenticated, user } = useStoreState(state => state.user.auth);

  return isAuthenticated ? (
    props.role ? (
      (isArray(props.role) ? (
        props.role.indexOf(user.role) !== -1
      ) : (
        user.role === props.role
      )) ? (
        <Route
          {...props}
          render={routeProps =>
            React.createElement(component, { ...routeProps, ...props })
          }
        />
      ) : (
        <Redirect to={routes.userLogin.path} />
      )
    ) : (
      <Route
        {...props}
        render={routeProps =>
          React.createElement(component, { ...routeProps, ...props })
        }
      />
    )
  ) : (
    <Redirect to={routes.userLogin.path} />
  );
};

export default RoutePrivate;
