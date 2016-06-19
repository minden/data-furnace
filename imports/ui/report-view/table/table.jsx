import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import Measures from '../../../api/measures/measures.js';
import Reports from '../../../api/reports/reports.js';
import TableHeadRow from './table-head-row.jsx';

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
      {props.report.elements.map((element, position) => {
        return (
          <TableHeadRow
            elements={props.report.elements}
            element={element}
            position={position}
          />
        );
      })}
    </thead>
    <tbody>
      <tr>
        <th
          rowSpan={props.report.measures.length + 1}
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
      {props.report.measures.map((row) => {
        return (
          <tr key={row.measureId} >
            <td>
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
