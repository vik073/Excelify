// Imports
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// UI Imports
import Icon from 'ui/Icon';
import './style.css';

// Component
const Button = ({
  list,
  value,
  onClick,
  isLoading = false,
  disabled = false,
  as,
  className,
  ...props
}) =>
  React.createElement(
    as,
    {
      className: classnames(
        'button-group',
        className,
        isLoading ? 'disabled' : ''
      ),
      ...props
    },
    <Fragment>
      {list.map(item => (
        <button
          key={item.key}
          onClick={onClick(item.key)}
          className={item.key === value ? 'active' : ''}
          disabled={isLoading || disabled}
        >
          {item.iconLeft && (
            <Icon name={item.iconLeft} size="s" className="mr-1" />
          )}{' '}
          {item.title.toUpperCase()}{' '}
          {item.iconRight && (
            <Icon name={item.iconRight} size="s" className="ml-1" />
          )}
        </button>
      ))}
    </Fragment>
  );

// Component Properties
Button.propTypes = {
  list: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  as: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool
};
Button.defaultProps = {
  as: 'div'
};

export default Button;
