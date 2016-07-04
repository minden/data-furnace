import React, { PropTypes } from 'react';
import { ListGroupItem, Checkbox } from 'react-bootstrap';
import Elements from '../../../api/elements/elements.js';

const ElementFilter = (props) => {
  const element = Elements.collection.findOne(props.filter._id);
  console.log(element);
  return (
    <ListGroupItem>
      {element.name}
      {element.characteristics.map((characteristic) => (
        <Checkbox inline>{characteristic.value}</Checkbox>
      ))}
    </ListGroupItem>
  );
};

ElementFilter.propTypes = {
  filter: PropTypes.object.isRequired,
};

export default ElementFilter;
