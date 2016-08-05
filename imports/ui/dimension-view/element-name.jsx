import React from 'react';
import Elements from '../../api/elements/elements.js';
import InplaceEdit from '../components/inplace-edit.jsx';

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
    {props.readOnly &&
      <div>
        {props.elementName}
      </div>
    }
    {!props.readOnly &&
      <InplaceEdit
        onChange={(text) => Elements.setName(props.elementId, text)}
        text={elementName(props.elementName)}
      />
    }
  </div>
);

ElementName.propTypes = {
  elementName: React.PropTypes.string.isRequired,
  elementId: React.PropTypes.string.isRequired,
  readOnly: React.PropTypes.bool,
};

export default ElementName;
