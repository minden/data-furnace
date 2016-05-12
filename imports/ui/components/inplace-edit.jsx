import React from 'react';

export default class InplaceEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
    this.view = this.view.bind(this);
    this.edit = this.edit.bind(this);
  }

  view() {
    this.props.onChange(this.refs.input.value);
    this.setState({ editing: false });
  }

  edit() {
    this.setState({ editing: true }, () => {
      this.refs.input.focus();
    });
  }

  editIcon() {
    if (!this.props.text) {
    return (
      <span className="glyphicon glyphicon-pencil"></span>
    );
    }
  }

  render() {
    if (this.state.editing) {
      return (
        <input
          style={{ marginTop: '-3px', marginBottom: '-3px' }}
          type="text"
          defaultValue={this.props.text}
          ref="input"
          onBlur={this.view}
          size={this.props.text.length}
        />
      );
    }

    return (
      <div
        style={{ display: 'inline-block' }}
        onClick={this.edit}
      >
        {this.editIcon()}
        {this.props.text}
      </div>
    );
  }
}

InplaceEdit.propTypes = {
  text: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
};
