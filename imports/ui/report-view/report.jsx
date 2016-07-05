import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Panel, Button } from 'react-bootstrap';
import Reports from '../../api/reports/reports.js';
import ReportTable from './table/table.jsx';
import Filters from './filters/filters.jsx';

const reportHeader = (reportId, reportName) => (
  <div>
    {reportName}
    <Button
      className="glyphicon glyphicon-remove pull-right"
      style={{ padding: '0px', border: '0px', backgroundColor: 'transparent' }}
      onClick={() => Reports.remove(reportId)}
    />
  </div>
);

const Report = (props) => {
  if (!props.ready) {
    return null;
  }

  return (
    <Panel
      style={{ overflow: 'auto' }}
      header={reportHeader(props.report._id, props.report.name)}
    >
      <div
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
      </div>
      <hr />
      <div
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
      </div>
    </Panel>
  );
};

Report.propTypes = {
  report: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default createContainer(() => {
  const reportHandle = Meteor.subscribe('reports');
  const measureHandle = Meteor.subscribe('measures');

  if (reportHandle.ready() && Reports.collection.find().count() === 0) {
    Reports.add();
  }
  return {
    ready: reportHandle.ready() && measureHandle.ready(),
    report: Reports.collection.findOne(),
  };
}, Report);

// To bypass data container in tests
export { Report as ReportWithoutContainer };
