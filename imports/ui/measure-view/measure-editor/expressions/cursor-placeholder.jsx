import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

const CursorPlaceholder = (props) => (
  <Button onClick={() => props.setCursor({ afterExpressionId: props.expressionId })} >
    {isActive(props.cursor, props.expressionId)}
  </Button>
);

const isActive = (cursor, expressionId) => {
  if (cursor.afterExpressionId === expressionId) return '|';
};

CursorPlaceholder.propTypes = {
  cursor: PropTypes.object.isRequired,
  setCursor: PropTypes.func.isRequired,
  expressionId: PropTypes.string.isRequired,
};

export default CursorPlaceholder;
