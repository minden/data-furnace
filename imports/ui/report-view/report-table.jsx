import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import Measures from '../../api/measures/measures.js';
import Elements from '../../api/elements/elements.js';
import Reports from '../../api/reports/reports.js';

const ReportTable = (props) => (
  <Table bordered>
    <thead>
      <tr>
        <td /><td />
        <th
          onDrop={(ev) => Reports.addToTable(
            props.report._id,
            ev.dataTransfer.getData('text/type'),
            ev.dataTransfer.getData('text/id')
          )}
          onDragOver={(e) => { e.preventDefault(); console.log('dragged over'); }}
        >
          Elements
        </th>
      </tr>
      {props.report.columns.map((column) => {
        return (
          <tr key={column.elementId} >
            <td /><td />
            <td
            >
              {Elements.getName(column.elementId)}
            </td>
          </tr>
          );
      })}
    </thead>
    <tbody>
      <tr>
        <th rowSpan={props.report.rows.length + 1}
          onDrop={(ev) => Reports.addToTable(
            props.report._id,
            ev.dataTransfer.getData('text/type'),
            ev.dataTransfer.getData('text/id')
          )}
          onDragOver={(e) => { e.preventDefault(); console.log('dragged over'); }}
        >
          Measures
        </th>
      </tr>
      {props.report.rows.map((row) => {
        return (
          <tr key={row.measureId} >
            <td
            >
              {Measures.getName(row.measureId)}
            </td>
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
