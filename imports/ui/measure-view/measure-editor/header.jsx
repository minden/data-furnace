import React, { PropTypes } from 'react';
import InplaceEdit from '../../components/inplace-edit.jsx';
import RemoveButton from '../../components/remove-button.jsx';
import Measures from '../../../api/measures/measures.js';

const MeasureDetailsHeader = (props) => (
  <div>
    <InplaceEdit
      text={props.measure.name}
      onChange={(name) => Measures.setName(props.measure._id, name)}
    />
    <RemoveButton
      onClick={() => Measures.remove(props.measure._id)}
      name={props.measure.name}
      type="measure"
    />
  </div>
);

MeasureDetailsHeader.propTypes = {
  measure: PropTypes.object.isRequired,
};

export default MeasureDetailsHeader;
