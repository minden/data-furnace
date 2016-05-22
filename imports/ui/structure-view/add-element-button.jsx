import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Elements from '../../api/elements/elements.js';

export default class AddElementButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddElement = this.handleAddElement.bind(this);
  }

  handleAddElement(typeName) {
    Elements.add(this.props.elementId, typeName);
  }

  render() {
    const dropDownButtonStyle = {
      padding: '0px',
      border: '0px',
      backgroundColor: 'transparent',
    };

    if (this.props.possibleTypes.length !== 0) {
      return (
        <DropdownButton
          className="glyphicon glyphicon-plus add-element-button"
          id="add-element-dropdown"
          onSelect={this.handleAddElement}
          title=""
          style={dropDownButtonStyle}
        >
          {this.props.possibleTypes.map((elementType) => {
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
    }
    return (<div></div>);
  }
}

AddElementButton.propTypes = {
  elementId: React.PropTypes.string,
  possibleTypes: React.PropTypes.array.isRequired,
};
