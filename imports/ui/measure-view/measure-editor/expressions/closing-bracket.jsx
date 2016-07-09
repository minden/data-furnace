import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import CursorPlaceholder from './cursor-placeholder.jsx';

const ClosingBracket = (props) => (
  <div key={props.expression._id}>
    <Button
      style={props.buttonStyle}
      className="fa"
    >
      {closingBracketCharacter}
    </Button>
    <CursorPlaceholder
      cursor={props.cursor}
      setCursor={props.setCursor}
      expressionId={props.expression._id}
    />
  </div>
);

const closingBracketCharacter = ')';

ClosingBracket.propTypes = {
  measure: PropTypes.object.isRequired,
  expression: PropTypes.object.isRequired,
  buttonStyle: PropTypes.object.isRequried,
  cursor: PropTypes.object.isRequired,
  setCursor: PropTypes.func.isRequired,
};

export default ClosingBracket;
