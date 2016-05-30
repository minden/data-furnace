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
      <Button className="fa fa-balance-scale">{props.measure.name}</Button>
      <Button className="fa">=</Button>
      <ButtonToolbar id="expressions">
        {props.measure.expressions.map((expression) => {
          return Expression[expression.typeName]({ measure: props.measure, expression });
        })}
      </ButtonToolbar>
    </ButtonToolbar>
  );
};

Expressions.propTypes = {
  measure: PropTypes.object.isRequired,
};

export default Expressions;
