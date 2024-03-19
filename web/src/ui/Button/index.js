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
  title,
  as,
  variant,
  size,
  iconLeft,
  iconRight,
  className,
  ...props
}) =>
  React.createElement(
    as,
    { className: classnames('button', variant, size, className), ...props },
    <Fragment>
      {isLoading ? (
        <Fragment>
          <div className={`spinner spinner-button ${size}`}>
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {iconLeft && <Icon name={iconLeft} size="s" className="mr-1" />}{' '}
          {title}{' '}
          {iconRight && <Icon name={iconRight} size="s" className="ml-1" />}
        </Fragment>
      )}
    </Fragment>
  );

// Component Properties
Button.propTypes = {
  title: PropTypes.string.isRequired,
  as: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  className: PropTypes.string
};
Button.defaultProps = {
  as: 'button',
  variant: 'default',
  size: 'm'
};

export default Button;
