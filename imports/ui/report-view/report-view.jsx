import React, { PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import MeasureExplorer from '../measure-view/measure-explorer.jsx';
import ElementTree from '../structure-view/element-tree/element-tree.jsx';
import Report from './report.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

const ReportView = (props) => {
  if (!props.ready) return null;
  return (
    <div>
      <Col md={2}>
        <ElementTree setSelectedElementId={() => {}} readOnly draggable />
      </Col>
      <Col md={8}>
        <Report />
      </Col>
      <Col md={2}>
        <MeasureExplorer setSelectedMeasureId={() => {}} readOnly draggable />
      </Col>
    </div>
  );
};

ReportView.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default createContainer(() => {
  const elementHandle = Meteor.subscribe('elements');
  const measureHandle = Meteor.subscribe('measures');
  const reportHandle = Meteor.subscribe('reports');

  return {
    ready: elementHandle.ready() && measureHandle.ready() && reportHandle.ready(),
  };
}, ReportView);
