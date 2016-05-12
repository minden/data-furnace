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

  render() {
    if (this.state.editing) {
      return (
        <input
          style={{ marginLeft: '5px' }}
          type="text"
          defaultValue={this.props.text}
          ref="input"
          onBlur={this.view}
        />
      );
    }

    return (
      <div
        style={{ display: 'inline-block',
          paddingLeft: '7px',
          paddingTop: '3px',
          paddingBottom: '3px' }}
        onClick={this.edit}
      >
        {this.props.text}
      </div>
    );
  }
}

InplaceEdit.propTypes = {
  text: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};
