import React, { PropTypes } from 'react';
import { Alert, Table } from 'react-bootstrap';
import Measures from '../../../api/measures/measures.js';
import Reports from '../../../api/reports/reports.js';
import elementRows from './element-rows.jsx';
import RemoveButton from '../../components/remove-button.jsx';

const ReportTable = (props) => {
  if (props.report.elements.length === 0 && props.report.measures.length === 0) {
    return (
      <Alert bsStyle="warning">
        <strong>There are no elements or measures!</strong>
        &nbsp;Drag them from the left or right into this panel.
      </Alert>
    );
  }
  return (
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
              <td style={{ borderRight: '3px solid #ddd' }} >
                {Measures.getName(measure._id)}
                <RemoveButton
                  onClick={() => Reports.measures.remove(props.report._id, measure._id)}
                  name={Measures.getName(measure._id)}
                  type="measure"
                />
              </td>
            </tr>
            );
        })}
      </tbody>
    </Table>
  );
};

ReportTable.propTypes = {
  report: PropTypes.object.isRequired,
};

export default ReportTable;
