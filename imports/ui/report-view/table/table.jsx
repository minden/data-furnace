import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import Measures from '../../../api/measures/measures.js';
import Reports from '../../../api/reports/reports.js';
import elementRows from './element-rows.jsx';

const ReportTable = (props) => (
  <Table
    onDrop={(ev) => Reports.addToTable(
      props.report._id,
      ev.dataTransfer.getData('text/type'),
      ev.dataTransfer.getData('text/id')
    )}
    onDragOver={(e) => { e.preventDefault(); console.log('dragged over'); }}
    bordered
  >
    <thead>
      {elementRows(props.report._id, props.report.elements)}
    </thead>
    <tbody>
      {props.report.measures.map((measure) => {
        return (
          <tr key={measure._id} >
            <td>
              {Measures.getName(measure._id)}
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
