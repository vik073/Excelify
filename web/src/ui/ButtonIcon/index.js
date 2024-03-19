// Imports
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// UI Imports
import Icon from 'ui/Icon';
import './style.css';

// Component
const Button = ({
  isLoading = false,
  icon,
  as,
  size,
  disabled,
  className,
  ...props
}) =>
  React.createElement(
    as,
    {
      className: classnames(
        'button-icon',
        size,
        className,
        isLoading ? 'disabled' : ''
      ),
      ...{ disabled: disabled || isLoading },
      ...props
    },
    <Icon name={icon} />
  );

// Component Properties
Button.propTypes = {
  icon: PropTypes.string.isRequired,
  as: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string
};
Button.defaultProps = {
  as: 'button',
  size: 'm'
};

export default Button;
