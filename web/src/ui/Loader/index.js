// Imports
import React from 'react';
import PropTypes from 'prop-types';

// UI Imports
import Typography from '../Typography';
import './style.css';

// Component
export const Loading = ({ message, contained }) => (
  <div className={`loader ${contained ? 'contained' : ''}`}>
    <div className="spinner">
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>

    {message && <Typography size="h5">{message}</Typography>}
  </div>
);

// Component Properties
Loading.propTypes = {
  contained: PropTypes.bool,
  message: PropTypes.string
};
Loading.defaultProps = {
  contained: false,
  message: 'please wait...'
};

export default Loading;
