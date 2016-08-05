import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Elements from '../../../api/elements/elements.js';

const AddElementButton = (props) => {
  if (props.possibleTypeNames.length === 0) {
    return null;
  }

  const possibleTypes = Elements.types.filter(
    (type) => props.possibleTypeNames.indexOf(type.name) !== -1
  );

  const dropDownButtonStyle = {
    padding: '0px',
    border: '0px',
    backgroundColor: 'transparent',
  };

  return (
    <DropdownButton
      className="glyphicon glyphicon-plus add-element-button"
      id="add-element-dropdown"
      onSelect={(typeName) => Elements.add(props.elementId, typeName)}
      title=""
      style={dropDownButtonStyle}
      noCaret
    >
      {possibleTypes.map((elementType) => {
        return (
          <MenuItem
            eventKey={elementType.name}
            key={elementType.name}
          >
            {elementType.humanName}
          </MenuItem>);
      })}
    </DropdownButton>
  );
};

AddElementButton.propTypes = {
  elementId: React.PropTypes.string,
  possibleTypeNames: React.PropTypes.array.isRequired,
};

export default AddElementButton;
