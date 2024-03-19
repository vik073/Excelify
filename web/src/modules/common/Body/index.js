// Imports
import React, { Fragment, useEffect } from 'react';
import ReactGA from 'react-ga';

// App Imports
import { isDevelopment } from 'setup/helpers/utils';
import Notification from 'modules/common/Notification';
import './style.css';

// Component
const Body = ({ children }) => {
  useEffect(() => {
    // Google Analytics
    if (!isDevelopment()) {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <Fragment>
      <main className="common-body-main">{children}</main>

      {/* Notification */}
      <Notification />
    </Fragment>
  );
};

export default Body;
