import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Elements from '../../api/elements/elements.js';
import Element from './element.jsx';
import AddElementButton from './add-element-button.jsx';
import { Panel } from 'react-bootstrap';

const elementTreeHeader = () => (
  <AddElementButton
    possibleTypes={[Elements.types.find((element) => element.name === 'dimension')]}
  />
);

const ElementTree = (props) => (
  <div id="element-tree">
    <Panel header={elementTreeHeader()}>
      <div id="elements">
        {props.elements.map((element) => {
          return (
            <Element
              setSelectedElementId={props.setSelectedElementId}
              selectedElementId={props.selectedElementId}
              key={element._id}
              data={element}
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
};

export default createContainer(() => {
  return {
    elements: Elements.collection.find({ parentId: { $exists: false } }).fetch(),
  };
}, ElementTree);
