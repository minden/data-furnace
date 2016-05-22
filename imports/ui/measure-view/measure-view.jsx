import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MeasureExplorer from './measure-explorer.jsx';
import MeasureEditor from './measure-editor/measure-editor.jsx';

class MeasureView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMeasureId: undefined,
    };
    this.setSelectedMeasureId = this.setSelectedMeasureId.bind(this);
  }

  setSelectedMeasureId(measureId) {
    this.setState({ selectedMeasureId: measureId });
  }

  render() {
    return (
      <div id="measure-view" className="container">
        <Row>
          <Col md={4}>
            <MeasureExplorer
              selectedMeasureId={this.state.selectedMeasureId}
              setSelectedMeasureId={this.setSelectedMeasureId}
            />
          </Col>
          <Col md={8}>
            <MeasureEditor
              selectedMeasureId={this.state.selectedMeasureId}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default MeasureView;
