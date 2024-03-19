// Imports
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// UI Imports
import Typography from '../Typography';

// Component
const Range = ({ label, min, max, step, fullWidth, ...props }) => (
  <div
    className={classnames(
      'input range',
      fullWidth ? 'width-full' : 'width-auto'
    )}
  >
    {label && (
      <Typography size="h5" className="label">
        {label}
      </Typography>
    )}

    <input type="range" min={min} max={max} step={step} {...props} />
  </div>
);

// Component Properties
Range.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
};
Range.defaultProps = {
  fullWidth: false
};

export default Range;
