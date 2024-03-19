// Imports
import React from 'react';
import classnames from 'classnames';

// UI Imports
import './style.css';

// Component
const Container = ({ className, children, ...props }) => (
  <div className={classnames('container', className)} {...props}>
    {children}
  </div>
);

export default Container;
