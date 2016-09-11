import React, { PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import Reports from '../../api/reports/reports.js';
import ReportTable from './table/table.jsx';
import Filters from './filters/filters.jsx';
import InplaceEdit from '../components/inplace-edit.jsx';
import RemoveButton from '../components/remove-button.jsx';

const Report = (props) => (
  <div>
    {/*  Not using react panel to be able to only display panel-heading and no panel-body */}
    <div className="panel panel-default">
      <div className="panel-heading" >
        <div className="panel-title" >
          <InplaceEdit
            onChange={(name) => Reports.setName(props.report._id, name)}
            text={props.report.name}
          />
          <RemoveButton
            onClick={() => Reports.remove(props.report._id)}
            name={props.report.name}
            type="report"
          />
        </div>
      </div>
    </div>
    <Panel
      className="report-table-wrapper"
      onDrop={(ev) => Reports.addToTable(
        props.report._id,
        ev.dataTransfer.getData('text/type'),
        ev.dataTransfer.getData('text/id')
      )}
      onDragOver={(e) => e.preventDefault()}
    >
      <h4>Table</h4>
      <ReportTable report={props.report} />
    </Panel>
    <Panel
      className="filters-wrapper"
      onDrop={(ev) => Reports.filters.add(
        props.report._id,
        ev.dataTransfer.getData('text/type'),
        ev.dataTransfer.getData('text/id')
      )}
      onDragOver={(e) => e.preventDefault()}
    >
      <h4>Filters</h4>
      <Filters report={props.report} />
    </Panel>
  </div>
);

Report.propTypes = {
  report: PropTypes.object,
};

export default Report;

// To bypass data container in tests
export { Report as ReportWithoutContainer };
