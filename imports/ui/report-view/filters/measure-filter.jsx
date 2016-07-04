import React, { PropTypes } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import Measures from '../../../api/measures/measures.js';

const MeasureFilter = (props) => {
  const measure = Measures.collection.findOne(props.filter._id);
  return (
    <ListGroupItem>
      <span className="fa fa-balance-scale" />
      {measure.name}
    </ListGroupItem>
  );
};

MeasureFilter.propTypes = {
  filter: PropTypes.object.isRequired,
};

export default MeasureFilter;
