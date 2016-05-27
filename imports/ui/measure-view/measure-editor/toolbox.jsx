import React, { PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Measures from '../../../api/measures/measures.js';

const isDisabled = (measureId, typeName) => {
  const measure = Measures.collection.findOne(measureId);

  if (measure.expressions.length === 0) {
    return typeName === 'operator';
  }

  const lastExpressionTypeName = measure.expressions.pop().typeName;
  const type = Measures.Expressions.types.get(lastExpressionTypeName);
  return type.possibleFollowers.indexOf(typeName) === -1;
};

const Toolbox = (props) => {
  return (
    <div className="text-right" id="toolbox">
      <ButtonGroup>
        {Measures.Expressions.types.map((type) => {
          return (
            <Button
              disabled={isDisabled(props.measureId, type.name)}
              key={type.name}
              onClick={() => Measures.Expressions.add(props.measureId, type.name)}
              className={type.icon}
            > {type.name}</Button>
            );
        })}
      </ButtonGroup>
      <Button
        className="fa fa-trash"
        style={{ marginLeft: '5px' }}
        onClick={() => Measures.Expressions.removeLast(props.measureId)}
      />
    </div>
  );
};

Toolbox.propTypes = {
  measureId: PropTypes.string.isRequired,
};

export default Toolbox;
