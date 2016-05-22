import Measures from '../../api/measures/measures.js';
import React, { PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import measureDetailsHeader from './measure-details-header.js';

const MeasureDetails = (props) => {
  if (!props.selectedMeasureId) {
    return null;
  }

  return (
    <Panel header={measureDetailsHeader({ measure: props.measure })}>
    </Panel>
  );
};

MeasureDetails.propTypes = {
  measure: PropTypes.object,
  selectedMeasureId: PropTypes.string,
};

export default createContainer((props) => {
  return {
    measure: Measures.collection.findOne(props.selectedMeasureId),
  };
}, MeasureDetails);

