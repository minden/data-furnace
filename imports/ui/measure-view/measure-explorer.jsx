import React, { PropTypes } from 'react';
import Measures from '../../api/measures/measures.js';
import { Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import InplaceEdit from '../components/inplace-edit.jsx';

const panelHeader = (readOnly) => (
  <div>
    Measures
    {!readOnly &&
      <Button
        className="glyphicon glyphicon-plus pull-right"
        style={{ padding: '0px', border: '0px', backgroundColor: 'transparent' }}
        onClick={() => Measures.add()}
      />
    }
  </div>
);

const MeasureExplorer = (props) => (
  <Panel header={panelHeader(props.readOnly)}>
    <ListGroup>
      {props.measures.map((measure) => {
        return (
          <ListGroupItem
            active={props.selectedMeasureId === measure._id}
            key={measure._id}
            onDragStart={(ev) => {
              ev.dataTransfer.setData('text/id', measure._id);
              ev.dataTransfer.setData('text/type', 'measure');
            }}
            draggable={props.draggable}
          >
            <div onClick={() => props.setSelectedMeasureId(measure._id)} >
              <InplaceEdit
                text={measure.name}
                onChange={(name) => Measures.setName(measure._id, name)}
              />
              {!props.readOnly &&
                <Button
                  className="glyphicon glyphicon-trash pull-right"
                  style={{ padding: '0px', border: '0px', backgroundColor:
                    'transparent', color: '#DE4646' }}
                  onClick={() => Measures.remove(measure._id)}
                />
              }
            </div>
          </ListGroupItem>
          );
      })}
    </ListGroup>
  </Panel>
);

MeasureExplorer.propTypes = {
  measures: PropTypes.array.isRequired,
  selectedMeasureId: PropTypes.string,
  setSelectedMeasureId: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  draggable: PropTypes.bool,
};

export default createContainer(() => {
  return {
    measures: Measures.collection.find({}).fetch(),
  };
}, MeasureExplorer);
