import React from 'react';
import Elements from '../../api/elements/elements.js';
import InplaceEdit from '../components/inplace-edit.jsx';

const setName = (elementId, text) => {
  Elements.setName(elementId, text);
};

const elementName = (name) => {
  if (name.length === 0) {
    return 'name';
  }
  return name;
};

const ElementName = (props) => (
  <div
    className="elementName"
    style={{ display: 'inline-block' }}
  >
    <InplaceEdit
      onChange={(text) => setName(props.elementId, text)}
      text={elementName(props.elementName)}
    />
  </div>
);

ElementName.propTypes = {
  elementName: React.PropTypes.string.isRequired,
  elementId: React.PropTypes.string.isRequired,
};

export default ElementName;
