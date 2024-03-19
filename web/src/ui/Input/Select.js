// Imports
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// UI Imports
import Typography from '../Typography';

// Component
const Select = ({
  type,
  label,
  placeholder,
  fullWidth,
  required,
  className,
  children,
  ...props
}) => (
  <div
    className={classnames(
      'input select',
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

    <select placeholder={placeholder} {...props}>
      {children}
    </select>
  </div>
);

// Component Properties
Select.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool
};
Select.defaultProps = {
  type: 'text',
  fullWidth: false,
  required: false
};

export default Select;
