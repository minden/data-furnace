import React from 'react';
import Elements from '../../api/elements.js';

export default class ElementName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
    this.setName = this.setName.bind(this);
    this.editName = this.editName.bind(this);
  }

  setName() {
    Elements.setName(this.props.elementId, this.refs.nameInput.value);
    this.setState({ editing: false });
  }

  editName() {
    this.setState({ editing: true }, () => {
      this.refs.nameInput.focus();
    });
  }

  render() {
    let elementName;
    if (this.props.elementName.length === 0) {
      elementName = 'name';
    } else {
      elementName = this.props.elementName;
    }

    if (this.state.editing) {
      return (
        <input
          className="elementName"
          style={{ marginLeft: '5px' }}
          type="text"
          defaultValue={this.props.elementName}
          ref="nameInput"
          onBlur={this.setName}
        />
      );
    }

    return (
      <div
        className="elementName"
        style={{ display: 'inline-block',
          paddingLeft: '7px',
          paddingTop: '3px',
          paddingBottom: '3px' }}
        onClick={this.editName}
      >
        {elementName}
      </div>
    );
  }
}

ElementName.propTypes = {
  elementName: React.PropTypes.string.isRequired,
  elementId: React.PropTypes.string.isRequired,
};
