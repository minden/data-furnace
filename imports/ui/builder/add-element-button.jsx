import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import Elements from '../../api/elements.js';

export default class AddElementButton extends React.Component {
  handleAddElement(typeName) {
    Elements.add(this.props.elementId, typeName);
  }
  render() {
    const dropDownButtonStyle = {
      padding: '0px',
      border: '0px',
      backgroundColor: 'transparent',
    }
    return (
      <DropdownButton 
        className="glyphicon glyphicon-plus"
        id="add-element-dropdown" 
        onSelect={this.handleAddElement.bind(this)}
        title="" 
        style={dropDownButtonStyle}
      >
        {Elements.types.map(function(elementType) {
          return <MenuItem eventKey={elementType.name} key={elementType.name}>{elementType.humanName}</MenuItem>;
        })}
      </DropdownButton>
    )
  }
}
