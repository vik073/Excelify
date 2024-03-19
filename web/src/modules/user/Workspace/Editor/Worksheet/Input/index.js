// Imports
import React, { useState, useRef } from 'react';
import ContentEditable from 'react-contenteditable';

// App imports
import params from 'setup/config/params';

// Component
const Input = ({
  id,
  focused,
  setFocused,
  Ispermission,
  rowSpan,
  colSpan,
  col,
  updateItem,
  expandItem,
  isExpandingItem,
  axis,
  style
}) => {
  // state
  const [value, setValue] = useState(col.value);
  const [isEditable, isEditableToggle] = useState(false);
  const ref = useRef(null);

  const onChange = event => {
    setValue(event.target.value);
  };

  const onBlur = event => {
    console.log(col, event, 'jkhj')
    updateItem(col, event.target.innerText, Ispermission);
    setFocused(null);
    //isEditableToggle(false);
  };

  const onKeyPress = () => {

    isEditableToggle(true);
    const keyCode = event.keyCode || event.which;

    if (keyCode === 13) {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
    }

    // setFocused(null);

    setTimeout(() => {
      ref.current.focus();
    });
  };

  const onClick = () => {
    isEditableToggle(true);

    setFocused(id);
  };

  return (
    <ContentEditable
      tabIndex="0"
      innerRef={ref}
      tagName="td"
      html={value}
      onChange={onChange}
      onBlur={onBlur}
      onDoubleClick={expandItem(col, value)}
      onClick={onClick}
      onKeyPress={onKeyPress}
      rowSpan={rowSpan}
      colSpan={colSpan}
      className={`cell ${focused === id ? 'focused' : ''}`}
      disabled={!isEditable}
      style={{
        backgroundColor: col.color,
        color:
          axis === params.common.axis.mark.key
            ? col.isComputed
              ? '#000000'
              : '#0000FF'
            : '#000000'
      }}
    // defaultValue={`(r: ${ col.relationships.length }) [${ col.x }, ${ col.y }] s: ${ col.span }`}
    // defaultValue={`${ col._id.slice(-3) }  {${ col.relationships && col.relationships.length > 0 ? col.relationships[col.relationships.length - 1].slice(-3) : '' }} (r: ${ col.relationships.length }) [${ col.x }, ${ col.y }]`}
    />
  );
};

export default Input;
