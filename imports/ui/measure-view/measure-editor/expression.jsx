import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import Measures from '../../../api/measures/measures.js';
import InplaceEdit from '../../components/inplace-edit.jsx';


const attribute = (props) => {
  const type = Measures.Expressions.types.get(props.expression.typeName);
  return (
    <Button className={type.icon} key={props.expression._id}>
      <InplaceEdit
        text={props.expression.name}
        onChange={(name) =>
          Meteor.call(
            'measures.expressions.setName',
            props.measure._id,
            props.expression._id,
            name
          )}
      />
    </Button>
  );
};

attribute.propTypes = {
  measure: PropTypes.object.isRequired,
  expression: PropTypes.object.isRequired,
};

const measure = (props) => {
  const type = Measures.Expressions.types.get(props.expression.typeName);

  let choosenMeasureName = ' ';
  if (props.expression.measureId) {
    choosenMeasureName += Measures.collection.findOne(props.expression.measureId).name;
  }

  const measures = Measures.collection.find({}).fetch();
  return (
    <DropdownButton
      id={props.expression._id}
      className={type.icon}
      key={props.expression._id}
      title={choosenMeasureName}
      onSelect={(measureId) => Meteor.call(
        'Measures.Expressions.setMeasure',
        props.measure._id,
        props.expression._id,
        measureId
      )}
    >
      {measures.map((measureItem) => {
        return (
          <MenuItem key={measureItem._id} eventKey={measureItem._id}>{measureItem.name}</MenuItem>
          );
      })}
    </DropdownButton>
  );
};

measure.propTypes = {
  measure: PropTypes.object.isRequired,
  expression: PropTypes.object.isRequired,
};

const operator = (props) => {
  const type = Measures.Expressions.types.get(props.typeName);
  return (
    <Button className={type.icon} key={props._id}> {props.typeName}</Button>
  );
};

operator.propTypes = {
  measure: PropTypes.object.isRequired,
  expression: PropTypes.object.isRequired,
};

const func = (props) => {
  const type = Measures.Expressions.types.get(props.typeName);
  return (
    <Button className={type.icon} key={props._id}> {props.typeName}</Button>
  );
};

func.propTypes = {
  measure: PropTypes.object.isRequired,
  expression: PropTypes.object.isRequired,
};

const Expression = { attribute, measure, operator, func };

export default Expression;
