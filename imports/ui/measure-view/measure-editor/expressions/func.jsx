import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Measures from '../../../../api/measures/measures.js';
import CursorPlaceholder from './cursor-placeholder.jsx';

const Func = (props) => {
  const type = Measures.Expressions.types.get(props.expression.typeName);

  let icon;
  if (props.expression.name) {
    icon = 'fa';
  } else {
    icon = type.icon;
  }

  return (
    <div
      key={props.expression._id}
    >
      <DropdownButton
        style={props.buttonStyle}
        className={icon}
        title={props.expression.name}
        noCaret
        onSelect={(name) => Meteor.call(
          'Measures.Expressions.setName',
          props.measure._id,
          props.expression._id,
          name
        )}
      >
        {type.characteristics.map((characteristic) => (
          <MenuItem
            key={characteristic.name}
            eventKey={characteristic.name}
          >
            {characteristic.name}
          </MenuItem>
        ))}
      </DropdownButton>
      <CursorPlaceholder
        cursor={props.cursor}
        setCursor={props.setCursor}
        expressionId={props.expression._id}
      />
    </div>
  );
};

Func.propTypes = {
  measure: PropTypes.object.isRequired,
  expression: PropTypes.object.isRequired,
  buttonStyle: PropTypes.object.isRequried,
  cursor: PropTypes.object.isRequired,
  setCursor: PropTypes.func.isRequired,
};

export default Func;

