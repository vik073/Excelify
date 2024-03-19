// Imports
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import DatePicker from 'react-datepicker'

// UI Imports
import Typography from '../Typography'

// Component
const DateTimePicker = ({ label, fullWidth, className, ...props }) => (
  <div className={classnames('input range', (fullWidth ? 'width-full' : 'width-auto'), className)}>
    { label && <Typography size='h5' className='label'>{ label }</Typography>}

    <DatePicker
      { ...props }
    />
  </div>
)

// Component Properties
DateTimePicker.propTypes = {
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
}
DateTimePicker.defaultProps = {
  fullWidth: false,
}

export default DateTimePicker