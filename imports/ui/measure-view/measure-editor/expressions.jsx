import React, { PropTypes } from 'react';
import { Label, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import Expression from './expression.jsx';

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
