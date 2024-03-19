// Imports
import React from 'react';

// UI imports
import Typography from 'ui/Typography';
import './style.css';

// Component
const EmptyMessage = ({ message }) => {
  return (
    <div className="common-empty-message">
      <Typography className="text-muted">{message}</Typography>
    </div>
  );
};

export default EmptyMessage;
