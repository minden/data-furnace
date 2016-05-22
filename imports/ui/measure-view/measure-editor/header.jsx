import React, { PropTypes } from 'react';
import InplaceEdit from '../../components/inplace-edit.jsx';
import Measures from '../../../api/measures/measures.js';

const MeasureDetailsHeader = (props) => (
  <InplaceEdit
    text={props.measure.name}
    onChange={(name) => Measures.setName(props.measure._id, name)}
  />
);

MeasureDetailsHeader.propTypes = {
  measure: PropTypes.object.isRequired,
};

export default MeasureDetailsHeader;
