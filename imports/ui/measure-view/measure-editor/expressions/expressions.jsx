import React, { PropTypes } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import attribute from './attribute.jsx';
import measure from './measure.jsx';
import operator from './operator.jsx';
import func from './func.jsx';

const Expression = { attribute, measure, operator, func };

const Expressions = (props) => {
  return (
    <ButtonToolbar>
      <Button style={buttonStyle} className="fa fa-balance-scale"> {props.measure.name}</Button>
      <Button style={buttonStyle} className="fa">=</Button>
      {props.measure.expressions.map((expression) => {
        return Expression[expression.typeName](
          {
            measure: props.measure,
            setCursor: props.setCursor,
            cursor: props.cursor,
            expression,
            buttonStyle,
          }
        );
      })}
    </ButtonToolbar>
  );
};

const buttonStyle = {
  border: 'none',
};

Expressions.propTypes = {
  measure: PropTypes.object.isRequired,
  cursor: PropTypes.object.isRequired,
  setCursor: PropTypes.func.isRequired,
};

export { Expression };
export default Expressions;
