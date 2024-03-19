// Imports
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// UI Imports
import Typography from '../Typography';

// Component
const Textarea = ({
  type,
  label,
  placeholder,
  fullWidth,
  required,
  children,
  ...props
}) => (
  <div
    className={classnames(
      'input textarea',
      fullWidth ? 'width-full' : 'width-auto'
    )}
  >
    {label && (
      <Typography size="h5" className="label">
        {label}
        {required && ' *'}
      </Typography>
    )}

    <textarea placeholder={placeholder} {...props}>
      {children}
    </textarea>
  </div>
);

// Component Properties
Textarea.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool
};
Textarea.defaultProps = {
  type: 'text',
  fullWidth: false,
  required: false
};

export default Textarea;
