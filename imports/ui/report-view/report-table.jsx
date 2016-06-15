import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import Measures from '../../api/measures/measures.js';
import Elements from '../../api/elements/elements.js';
import Reports from '../../api/reports/reports.js';

const ReportTable = (props) => (
  <Table>
    <thead>
      {props.report.columns.map((column) => {
        return (
          <tr key={column.elementId} >
            <th></th>
            <th
              onDrop={(ev) => Reports.addToTable(
                props.report._id,
                ev.dataTransfer.getData('text/type'),
                ev.dataTransfer.getData('text/id')
              )}
              onDragOver={(e) => { e.preventDefault(); console.log('dragged over'); }}
            >
              {Elements.getName(column.elementId)}
            </th>
          </tr>
          );
      })}
    </thead>
    <tbody>
      {props.report.rows.map((row) => {
        return (
          <tr key={row.measureId} >
            <th
              onDrop={(ev) => Reports.addToTable(
                props.report._id,
                ev.dataTransfer.getData('text/type'),
                ev.dataTransfer.getData('text/id')
              )}
              onDragOver={(e) => { e.preventDefault(); console.log('dragged over'); }}
            >
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
