// Imports
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// UI Imports
import './style.css';

// Component
const Icon = ({ name, size, className, ...props }) => (
  <i
    className={classnames('icon', 'material-icons', size, className)}
    {...props}
  >
    {name}
  </i>
);

// Component Properties
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  className: PropTypes.string
};
Icon.defaultProps = {
  size: 'm',
  color: ''
};

export default Icon;
