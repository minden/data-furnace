import React, { PropTypes } from 'react';
import Measures from '../../api/measures/measures.js';
import { Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';

const panelHeader = (props) => (
  <div>
    Measures
    <Button
      className="glyphicon glyphicon-plus pull-right"
      style={{ padding: '0px', border: '0px', backgroundColor: 'transparent' }}
      onClick={() => Measures.add()}
    />
  </div>
);

const MeasureExplorer = (props) => (
  <Panel header={panelHeader()}>
    <ListGroup>
      {props.measures.map((measure) => {
        return (
          <ListGroupItem>{measure.name}</ListGroupItem>
          );
      })}
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
