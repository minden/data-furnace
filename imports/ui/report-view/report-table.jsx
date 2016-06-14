import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';

const ReportTable = (props) => (
  <Table>
    <thead>
      {props.report.columns.map((column) => {
        return (
          <tr key={column.elementId} >
            <th></th>
            <th>{column.elementId}</th>
          </tr>
          );
      })}
    </thead>
    <tbody>
      {props.report.rows.map((row) => {
        return (
          <tr key={row.measureId} >
            <th>
              {row.measureId}
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
