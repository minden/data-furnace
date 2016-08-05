import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Elements from '../../../api/elements/elements.js';
import Element from './element.jsx';
import { Button, Panel } from 'react-bootstrap';
import InplaceEdit from '../../components/inplace-edit.jsx';

const elementTreeHeader = (referenceObject, readOnly) => (
  <div>
    <InplaceEdit
      onChange={(text) => Elements.setName(referenceObject._id, text)}
      text={referenceObject.name}
    />
    <div className="pull-right">
      {!readOnly && <Button
        className="glyphicon glyphicon-plus pull-right"
        style={{ padding: '0px', border: '0px', backgroundColor: 'transparent' }}
        onClick={() => Elements.add(referenceObject._id, 'dimension')}
      />}
    </div>
  </div>
);

const ElementTree = (props) => (
  <div className="element-tree">
    <Panel header={elementTreeHeader(props.referenceObject, props.readOnly)}>
      <div id="elements">
        {props.elements.map((element) => {
          return (
            <Element
              setSelectedElementId={props.setSelectedElementId}
              selectedElementId={props.selectedElementId}
              key={element._id}
              element={element}
              readOnly={props.readOnly}
              draggable={props.draggable}
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
  draggable: PropTypes.bool,
  referenceObject: PropTypes.object.isRequired,
};

export default createContainer((props) => {
  return {
    elements: Elements.collection.find(
      { parentId: props.referenceObject._id, typeName: 'dimension' }
    ).fetch(),
  };
}, ElementTree);
