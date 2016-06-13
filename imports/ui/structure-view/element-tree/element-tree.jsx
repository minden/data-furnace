import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Elements from '../../../api/elements/elements.js';
import Element from './element.jsx';
import AddElementButton from './add-element-button.jsx';
import { Panel } from 'react-bootstrap';

const elementTreeHeader = (readOnly) => (
  <div>
    Elements
    <div className="pull-right">
      {!readOnly && <AddElementButton possibleTypeNames={['dimension']} />}
    </div>
  </div>
);

const ElementTree = (props) => (
  <div id="element-tree">
    <Panel header={elementTreeHeader(props.readOnly)}>
      <div id="elements">
        {props.elements.map((element) => {
          return (
            <Element
              setSelectedElementId={props.setSelectedElementId}
              selectedElementId={props.selectedElementId}
              key={element._id}
              element={element}
              readOnly={props.readOnly}
            />
            );
        })}
      </div>
    </Panel>
  </div>
);

ElementTree.propTypes = {
  elements: PropTypes.array.isRequired,
  setSelectedElementId: PropTypes.func.isRequired,
  selectedElementId: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default createContainer(() => {
  return {
    elements: Elements.collection.find({ parentId: { $exists: false } }).fetch(),
  };
}, ElementTree);
