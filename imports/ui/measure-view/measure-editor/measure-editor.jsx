import React, { PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import Measures from '../../../api/measures/measures.js';
import toolbox from './toolbox.jsx';
import Expressions from './expressions/expressions.jsx';
import header from './header.jsx';
import { createContainer } from 'meteor/react-meteor-data';

const MeasureEditor = (props) => {
  if (!props.measure) {
    return null;
  }

  return (
    <Panel
      header={header({ measure: props.measure })}
      footer={toolbox({ measureId: props.measure._id })}
    >
      <Expressions measure={props.measure} />
    </Panel>
  );
};

MeasureEditor.propTypes = {
  measure: PropTypes.object,
  selectedMeasureId: PropTypes.string,
};

export default createContainer((props) => {
  return {
    measure: Measures.collection.findOne(props.selectedMeasureId),
  };
}, MeasureEditor);

