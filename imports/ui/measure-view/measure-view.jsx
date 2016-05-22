import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MeasureExplorer from './measure-explorer.jsx';
import MeasureDetails from './measure-details.jsx';

const MeasureView = (props) => (
  <div id="measure-view" className="container">
    <Row>
      <Col md={4}>
        <MeasureExplorer />
      </Col>
      <Col md={8}>
        <MeasureDetails />
      </Col>
    </Row>
  </div>
);

export default MeasureView;
