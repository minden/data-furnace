import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import MeasureExplorer from './measure-explorer.jsx';
import MeasureEditor from './measure-editor/measure-editor.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

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
    if (!this.props.ready) return null;
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

MeasureView.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default createContainer(() => {
  const measureHandle = Meteor.subscribe('measures');

  return {
    ready: measureHandle.ready(),
  };
}, MeasureView);
