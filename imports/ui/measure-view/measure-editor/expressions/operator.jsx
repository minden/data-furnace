import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Measures from '../../../../api/measures/measures.js';
import CursorPlaceholder from './cursor-placeholder.jsx';


const Operator = (props) => {
  let icon;
  if (props.expression.name) {
    icon = 'fa';
  } else {
    icon = 'fa fa-calculator';
  }

  const type = Measures.Expressions.types.get(props.expression.typeName);

  return (
    <div key={props.expression._id} >
      <DropdownButton
        style={props.buttonStyle}
        id={props.expression._id}
        className={icon}
        title={props.expression.name}
        onSelect={(name) => Meteor.call(
          'Measures.Expressions.setName',
          props.measure._id,
          props.expression._id,
          name
        )}
        noCaret
      >
        {type.characteristics.map((characteristic) => {
          return (
            <MenuItem
              key={characteristic.name}
              eventKey={characteristic.name}
            >
              {characteristic.name}</MenuItem>
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

Operator.propTypes = {
  measure: PropTypes.object.isRequired,
  expression: PropTypes.object.isRequired,
  buttonStyle: PropTypes.object.isRequired,
  cursor: PropTypes.object.isRequired,
  setCursor: PropTypes.func.isRequired,
};

export default Operator;
