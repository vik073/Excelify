// Imports
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// UI Imports
import Typography from '../Typography';
import './style.css';

// Component
const Toast = ({ success, message, onClick, className, ...props }) => (
  <div
    onClick={onClick}
    className={classnames(
      'toast animation slide-up',
      className,
      `toast-border-${success ? 'success' : 'error'}`
    )}
    {...props}
  >
    <Typography
      size="h6"
      weight="bold"
      className={`text-uppercase ${
        success === undefined
          ? 'text-warning'
          : success
          ? 'text-positive'
          : 'text-negative'
      }`}
    >
      {success === undefined ? 'Info' : success ? 'Success' : 'Error'}
    </Typography>

    <Typography size="h4" className="text-white mt-2">
      {message}
    </Typography>
  </div>
);

// Component Properties
Toast.propTypes = {
  success: PropTypes.bool,
  message: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
};
Toast.defaultProps = {
  success: false,
  message: ''
};

export default Toast;
