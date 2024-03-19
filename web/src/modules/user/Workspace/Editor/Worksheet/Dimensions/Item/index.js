// Imports
import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Typography from 'ui/Typography'

// UI imports
import Icon from 'ui/Icon'

const Item = ({ dimension, updateDimension, markItem }) => {



  return (
    <div className='list-item' style={{ backgroundColor: dimension.color }}>
      <Icon name='reorder' className='text-muted icon-move' size='s' />

      <input
        type='text'
        defaultValue={dimension.name}
        onBlur={updateDimension(dimension._id, dimension.name, markItem)}
      />

      {/* <Icon name='close' className='text-muted icon-remove' size='s' /> */}
    </div>
  )
}

export default Item