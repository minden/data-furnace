import React, { PropTypes } from 'react';
import Measures from '../../api/measures/measures.js';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';

const MeasureExplorer = (props) => (
  <Panel header={'Measures'}>
    <ListGroup>
      {props.measures.map((measure) => (
        <ListGroupItem
          key={measure._id}
          onDragStart={(ev) => {
            ev.dataTransfer.setData('text/id', measure._id);
            ev.dataTransfer.setData('text/type', 'measure');
          }}
          draggable
        >
          {measure.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  </Panel>
);

MeasureExplorer.propTypes = {
  measures: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    measures: Measures.collection.find({}).fetch(),
  };
}, MeasureExplorer);
