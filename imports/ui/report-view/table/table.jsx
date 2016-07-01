import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import Measures from '../../../api/measures/measures.js';
import elementRows from './element-rows.jsx';

const ReportTable = (props) => (
  <Table
    style={{ fontSize: '9pt' }}
    bordered
    responsive
    striped
  >
    <tbody>
      {elementRows(props.report._id, props.report.elements)}
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
