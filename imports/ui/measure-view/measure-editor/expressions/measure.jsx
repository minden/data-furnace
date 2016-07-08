import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Measures from '../../../../api/measures/measures.js';
import CursorPlaceholder from './cursor-placeholder.jsx';

const measure = (props) => {
  const type = Measures.Expressions.types.get(props.expression.typeName);

  let choosenMeasureName = ' ';
  if (props.expression.measureId) {
    choosenMeasureName += Measures.collection.findOne(props.expression.measureId).name;
  }

  const measures = Measures.collection.find({}).fetch();
  return (
    <div key={props.expression._id} >

      <DropdownButton
        style={props.buttonStyle}
        id={props.expression._id}
        className={type.icon}
        title={choosenMeasureName}
        onSelect={(measureId) => Meteor.call(
          'Measures.Expressions.setMeasureId',
          props.measure._id,
          props.expression._id,
          measureId
        )}
        noCaret
      >
        {measures.map((measureItem) => {
          return (
            <MenuItem key={measureItem._id} eventKey={measureItem._id}>{measureItem.name}</MenuItem>
            );
        })}
      </DropdownButton>
      <CursorPlaceholder
        cursor={props.cursor}
        setCursor={props.setCursor}
        expressionId={props.expression._id}
      />
    </div>
  );
};

measure.propTypes = {
  measure: PropTypes.object.isRequired,
  cursor: PropTypes.object.isRequired,
  setCursor: PropTypes.func.isRequired,
  expression: PropTypes.object.isRequired,
  buttonStyle: PropTypes.object.isRequired,
};

export default measure;
