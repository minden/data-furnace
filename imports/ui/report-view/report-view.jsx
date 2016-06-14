import React from 'react';
import { Col } from 'react-bootstrap';
import MeasureExplorer from '../measure-view/measure-explorer.jsx';
import ElementTree from '../structure-view/element-tree/element-tree.jsx';
import Report from './report.jsx';

const ReportView = () => (
  <div>
    <Col mdOffset={1} md={2}>
      <ElementTree setSelectedElementId={() => {}} readOnly draggable />
    </Col>
    <Col md={6}>
      <Report />
    </Col>
    <Col md={2}>
      <MeasureExplorer setSelectedMeasureId={() => {}} readOnly draggable />
    </Col>
  </div>
);

export default ReportView;
