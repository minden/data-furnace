import React, { PropTypes } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import Measures from '../../../api/measures/measures.js';
import Header from './header.jsx';

const MeasureFilter = (props) => {
  const measure = Measures.collection.findOne(props.filter._id);
  return (
    <ListGroupItem
      header={
        <Header name={measure.name} _id={measure._id} reportId={props.reportId} type="measure" />
        }
    />
  );
};

MeasureFilter.propTypes = {
  filter: PropTypes.object.isRequired,
  reportId: PropTypes.string.isRequired,
};

export default MeasureFilter;
