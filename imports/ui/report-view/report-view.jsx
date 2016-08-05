import React, { PropTypes } from 'react';
import Elements from '../../api/elements/elements.js';
import Reports from '../../api/reports/reports.js';
import { Col } from 'react-bootstrap';
import MeasureExplorer from '../measure-view/measure-explorer.jsx';
import ElementTree from '../dimension-view/element-tree/element-tree.jsx';
import Report from './report.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

const ReportView = (props) => {
  if (!props.ready) return null;
  return (
    <div>
      <Col md={2}>
        {props.businessObjects.map((businessObject) => (
          <ElementTree
            businessObject={businessObject}
            setSelectedElementId={() => {}}
            key={businessObject._id}
            readOnly
            draggable
          />
        ))}
      </Col>
      <Col md={8}>
        {props.reports.map((report) => (
          <Report report={report} key={report._id} />
        ))}
      </Col>
      <Col md={2}>
        <MeasureExplorer setSelectedMeasureId={() => {}} readOnly draggable />
      </Col>
    </div>
  );
};

ReportView.propTypes = {
  ready: PropTypes.bool.isRequired,
  businessObjects: PropTypes.array.isRequired,
  reports: PropTypes.array.isRequired,
};

export default createContainer(() => {
  const elementHandle = Meteor.subscribe('elements');
  const measureHandle = Meteor.subscribe('measures');
  const reportHandle = Meteor.subscribe('reports');

  return {
    ready: elementHandle.ready() && measureHandle.ready() && reportHandle.ready(),
    businessObjects: Elements.collection.find({ typeName: 'businessObject' }).fetch(),
    reports: Reports.collection.find().fetch(),
  };
}, ReportView);
