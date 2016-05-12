import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Elements from '../../api/elements.js';
import Element from './element.jsx';
import AddElementButton from './add-element-button.jsx';

const addElementButtonDivStyle = {
  border: '1px solid #ddd',
  backgroundColor: '#F8F8F8',
  padding: '10px',
};

const addElementButtonPossibleTypes =
  [Elements.types.find((element) => element.name === 'dimension')];

const elementsStyle = {
  border: '1px solid #ddd',
  borderTop: 'none',
  padding: '7px',
};

const ElementTree = (props) => (
  <div id="element-tree">
    <div style={addElementButtonDivStyle}>
      <AddElementButton
        possibleTypes={addElementButtonPossibleTypes}
      />
    </div>
    <div id="elements" style={elementsStyle}>
      {props.elements.map((element) => {
        return (
          <Element
            setSelectedElementId={props.setSelectedElementId}
            key={element._id}
            data={element}
          />
        );
      })}
    </div>
  </div>
);

ElementTree.propTypes = {
  elements: PropTypes.array.isRequired,
  setSelectedElementId: PropTypes.func.isRequired,
};

export default createContainer(() => {
  return {
    elements: Elements.collection.find({ parentId: { $exists: false } }).fetch(),
  };
}, ElementTree);
