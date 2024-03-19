// Imports
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// UI Imports
import Typography from '../Typography';

// Component
const Text = ({
  type,
  label,
  placeholder,
  info,
  fullWidth,
  required,
  className,
  ...props
}) => (
  <div
    className={classnames(
      'input text',
      fullWidth ? 'width-full' : 'width-auto',
      className
    )}
  >
    {label && (
      <Typography size="h5" className="label">
        {label}
        {required && ' *'}
      </Typography>
    )}

    <input
      type={type}
      placeholder={placeholder}
      required={required}
      {...props}
    />

    {info && (
      <Typography size="h6" className="info text-muted">
        {info}
      </Typography>
    )}
  </div>
);

// Component Properties
Text.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool
};
Text.defaultProps = {
  type: 'text',
  fullWidth: false,
  required: false
};

export default Text;
