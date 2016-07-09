import React, { PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Measures from '../../../api/measures/measures.js';

const isDisabled = (measureId, cursor, typeName) => {
  if (cursor.expressionIdBefore) {
    const expression = Measures.Expressions.get(measureId, cursor.expressionIdBefore);
    const type = Measures.Expressions.types.get(expression.typeName);
    return type.possibleFollowers.indexOf(typeName) === -1;
  }
  return typeName === 'operator';
};

const Toolbox = (props) => {
  return (
    <div className="text-right" id="toolbox">
      <ButtonGroup>
        {Measures.Expressions.types.map((type) => {
          return (
            <Button
              disabled={isDisabled(props.measureId, props.cursor, type.name)}
              key={type.name}
              onClick={() =>
                addBehindCursor(props.measureId, type.name, props.cursor, props.setCursor)
              }
              className={type.icon}
            >
              &nbsp;{type.uIName}
            </Button>
            );
        })}
      </ButtonGroup>
      <Button
        className="fa fa-trash"
        style={{ marginLeft: '5px' }}
        onClick={() => removeExpressionBeforeCursor(props.measureId, props.cursor, props.setCursor)}
      />
    </div>
  );
};

Toolbox.propTypes = {
  measureId: PropTypes.string.isRequired,
  cursor: PropTypes.object.isRequired,
  setCursor: PropTypes.func.isRequired,
};

const addBehindCursor = (measureId, typeName, cursor, setCursor) => {
  let newCursorPosition = Measures.Expressions.addBehindExpression(
    measureId, typeName, cursor.expressionIdBefore
  );

  if (typeName === 'func') {
    const openingBracketId = Measures.Expressions.addBehindExpression(
      measureId, 'openingBracket', newCursorPosition
    );
    newCursorPosition = Measures.Expressions.addBehindExpression(
      measureId, 'closingBracket', openingBracketId
    );
  }

  setCursor({ expressionIdBefore: newCursorPosition });
};

const removeExpressionBeforeCursor = (measureId, cursor, setCursor) => {
  const expressions = Measures.collection.findOne(measureId).expressions;

  if (expressions.length > 1) {
    const indexOfExpression =
      expressions.findIndex((expression) => expression._id === cursor.expressionIdBefore);
    let newExpressionId;
    if (indexOfExpression === 0) {
      newExpressionId = expressions[indexOfExpression + 1]._id;
    } else {
      newExpressionId = expressions[indexOfExpression - 1]._id;
    }
    setCursor({ expressionIdBefore: newExpressionId });
  }

  Measures.Expressions.remove(measureId, cursor.expressionIdBefore);
};

export default Toolbox;
