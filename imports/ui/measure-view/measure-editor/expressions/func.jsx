import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Measures from '../../../../api/measures/measures.js';

const Func = (props) => {
  const type = Measures.Expressions.types.get(props.expression.typeName);
  return (
    <Button
      style={props.buttonStyle}
      className={type.icon}
      key={props.expression._id}
    >
        {props.expression.name}
    </Button>
  );
};

Func.propTypes = {
  measure: PropTypes.object.isRequired,
  expression: PropTypes.object.isRequired,
  buttonStyle: PropTypes.object.isRequried,
};

export default Func;

