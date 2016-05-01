import React from 'react';
import Elements from '../../api/elements.js';

export default class ElementName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  editName() {
    this.setState({ editing: true }, () => {
      this.refs.nameInput.focus();
    });
  }

  setName() {
    Elements.setName(this.props.elementId, this.refs.nameInput.value);
    this.setState({ editing: false });
  }

  render() {
    if (this.state.editing) {
      return (
        <input
          style={{ marginLeft: '5px' }}
          type="text"
          defaultValue={this.props.elementName}
          ref="nameInput"
          onBlur={this.setName.bind(this)}
        />
      );
    }

    return (
      <div 
        style={{ display: 'inline-block', paddingLeft: '7px', paddingTop: '3px', paddingBottom: '3px'}}
        onClick={this.editName.bind(this)}
      >
        {this.props.elementName}
      </div>
    );
  }
}

ElementName.propTypes = {
  elementName: React.PropTypes.string.isRequired,
  elementId: React.PropTypes.string.isRequired
};
