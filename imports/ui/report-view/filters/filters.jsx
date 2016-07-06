import React, { PropTypes } from 'react';
import ElementFilter from './element-filter.jsx';
import MeasureFilter from './measure-filter.jsx';
import { Alert, ListGroup } from 'react-bootstrap';

const Filters = (props) => {
  if (props.report.filters.length === 0) {
    return (
      <Alert bsStyle="warning">
        <strong>There are no elements or measures!</strong>
        &nbsp;Drag them from the left or right into this panel.
      </Alert>
    )
  }
  return (
    <ListGroup>
      {props.report.filters.map((filter) => {
        if (filter.type === 'element') {
          return (<ElementFilter filter={filter} reportId={props.report._id} />);
        }
        return (<MeasureFilter filter={filter} reportId={props.report._id} />);
      })}
    </ListGroup>
  );
}

Filters.propTypes = {
  report: PropTypes.object.isRequired,
};

export default Filters;
