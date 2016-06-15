import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import Measures from '../../api/measures/measures.js';
import Elements from '../../api/elements/elements.js';

const ReportTable = (props) => (
  <Table bordered="true" >
    <thead>
      {props.report.columns.map((column) => {
        return (
          <tr key={column.elementId} >
            <th></th>
            <th>{Elements.getName(column.elementId)}</th>
          </tr>
          );
      })}
    </thead>
    <tbody>
      {props.report.rows.map((row) => {
        return (
          <tr key={row.measureId} >
            <th>
              {Measures.getName(row.measureId)}
            </th>
          </tr>
          );
      })}
    </tbody>
  </Table>
);

ReportTable.propTypes = {
  report: PropTypes.object.isRequired,
};

export default ReportTable;
