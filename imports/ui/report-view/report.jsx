import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Panel } from 'react-bootstrap';
import Reports from '../../api/reports/reports.js';
import ReportTable from './report-table.jsx';

const Report = (props) => {
  if (!props.ready) {
    return null;
  }

  return (
    <Panel header="Report">
      <div
        onDrop={(ev) => Reports.addToTable(
          props.report._id,
          ev.dataTransfer.getData('text/type'),
          ev.dataTransfer.getData('text/id')
        )}
        onDragOver={(e) => { e.preventDefault(); console.log('dragged over'); }}
      >
        DropZone
      </div>
      <ReportTable report={props.report} />
    </Panel>
  )
};

Report.propTypes = {
  report: PropTypes.object,
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
