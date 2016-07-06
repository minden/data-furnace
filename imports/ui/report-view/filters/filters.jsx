import React, { PropTypes } from 'react';
import ElementFilter from './element-filter.jsx';
import MeasureFilter from './measure-filter.jsx';
import { ListGroup } from 'react-bootstrap';

const Filters = (props) => (
  <ListGroup>
    {props.report.filters.map((filter) => {
      if (filter.type === 'element') {
        return (<ElementFilter filter={filter} reportId={props.report._id} />);
      }
      return (<MeasureFilter filter={filter} reportId={props.report._id} />);
    })}
  </ListGroup>
);

Filters.propTypes = {
  report: PropTypes.object.isRequired,
};

export default Filters;
