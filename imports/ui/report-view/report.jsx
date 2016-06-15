import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Panel, Button } from 'react-bootstrap';
import Reports from '../../api/reports/reports.js';
import ReportTable from './report-table.jsx';

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
    <Panel header={reportHeader(props.report._id, props.report.name)}>
      <ReportTable report={props.report} />
    </Panel>
  );
};

Report.propTypes = {
  report: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default createContainer(() => {
  const handle = Meteor.subscribe('reports');
  if (handle.ready() && Reports.collection.find().count() === 0) {
    Reports.add();
  }
  return {
    ready: handle.ready(),
    report: Reports.collection.findOne(),
  };
}, Report);
