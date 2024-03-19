// Imports
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// UI Imports
import './style.css';

// Component
const Typography = ({
  as,
  variant,
  size,
  weight,
  className,
  children,
  ...props
}) =>
  React.createElement(
    as,
    {
      className: classnames('typography', variant, size, weight, className),
      ...props
    },
    children
  );

// Component Properties
Typography.propTypes = {
  as: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  weight: PropTypes.string,
  className: PropTypes.string
};
Typography.defaultProps = {
  as: 'p',
  variant: 'primary',
  size: '',
  weight: ''
};

export default Typography;
