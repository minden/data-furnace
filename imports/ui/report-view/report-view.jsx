import React from 'react';
import { Col } from 'react-bootstrap';
import MeasureExplorer from '../measure-view/measure-explorer.jsx';
import ElementTree from '../structure-view/element-tree/element-tree.jsx';

const ReportView = () => (
  <div>
    <Col mdOffset={1} md={2}>
      <ElementTree setSelectedElementId={() => {}} readOnly />
    </Col>
    <Col md={6} />
    <Col md={2}>
      <MeasureExplorer setSelectedMeasureId={() => {}} readOnly />
    </Col>
  </div>
);

export default ReportView;
