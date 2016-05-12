import React from 'react';
import Elements from '../../api/elements.js';
import InplaceEdit from '../components/inplace-edit.jsx';

export default class ElementName extends React.Component {
  constructor(props) {
    super(props);
    this.setName = this.setName.bind(this);
  }

  setName(text) {
    Elements.setName(this.props.elementId, text);
    this.setState({ editing: false });
  }

  render() {
    let elementName;
    if (this.props.elementName.length === 0) {
      elementName = 'name';
    } else {
      elementName = this.props.elementName;
    }

    return (
      <div
        className="elementName"
        style= {{ display: 'inline-block' }}
      >
        <InplaceEdit onChange={this.setName} text={elementName} />
      </div>
    );
  }
}

ElementName.propTypes = {
  elementName: React.PropTypes.string.isRequired,
  elementId: React.PropTypes.string.isRequired,
};
