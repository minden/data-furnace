import React, { PropTypes } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import attribute from './attribute.jsx';
import constant from './constant.jsx';
import measure from './measure.jsx';
import operator from './operator.jsx';
import func from './func.jsx';
import openingBracket from './opening-bracket.jsx';
import closingBracket from './closing-bracket.jsx';

const Expression = { attribute, constant, measure, operator, func, openingBracket, closingBracket };

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
  paddingLeft: '6px',
  paddingRight: '6px',
};

Expressions.propTypes = {
  measure: PropTypes.object.isRequired,
  cursor: PropTypes.object.isRequired,
  setCursor: PropTypes.func.isRequired,
};

export { Expression };
export default Expressions;
