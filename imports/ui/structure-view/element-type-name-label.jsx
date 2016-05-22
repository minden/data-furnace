import React, { PropTypes } from 'react';
import Elements from '../../api/elements/elements.js';

const ElementTypeNameLabel = (props) => (
  <span className="label label-default">
    {Elements.types.nameToHumanName(props.typeName)}
  </span>
);

ElementTypeNameLabel.propTypes = {
  typeName: PropTypes.string.isRequired,
};

export default ElementTypeNameLabel;
