// Imports
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// UI Imports
import './style.css';

// Component
const Divider = ({ className, ...props }) => (
  <div className={classnames('divider', className)} {...props} />
);

export default Divider;
