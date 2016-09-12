import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import Measures from '../../../../api/measures/measures.js';
import InplaceEdit from '../../../components/inplace-edit.jsx';
import CursorPlaceholder from './cursor-placeholder.jsx';


const Constant = (props) => {
  const type = Measures.Expressions.types.get(props.expression.typeName);
  return (
    <div key={props.expression._id} >
      <Button
        style={props.buttonStyle}
        className={type.icon}
      >
        <InplaceEdit
          text={props.expression.name}
          onChange={(name) =>
            Meteor.call(
              'Measures.Expressions.setName',
              props.measure._id,
              props.expression._id,
              name
            )}
        />
      </Button>
      <CursorPlaceholder
        cursor={props.cursor}
        setCursor={props.setCursor}
        expressionId={props.expression._id}
      />
    </div>
  );
};

Constant.propTypes = {
  measure: PropTypes.object.isRequired,
  expression: PropTypes.object.isRequired,
  buttonStyle: PropTypes.object.isRequired,
  cursor: PropTypes.object.isRequired,
  setCursor: PropTypes.func.isRequired,
};

export default Constant;
