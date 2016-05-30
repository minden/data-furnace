import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import Measures from '../../../../api/measures/measures.js';
import InplaceEdit from '../../../components/inplace-edit.jsx';


const Attribute = (props) => {
  const type = Measures.Expressions.types.get(props.expression.typeName);
  return (
    <Button className={type.icon} key={props.expression._id}>
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
  );
};

Attribute.propTypes = {
  measure: PropTypes.object.isRequired,
  expression: PropTypes.object.isRequired,
};

export default Attribute;
