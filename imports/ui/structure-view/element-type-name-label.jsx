import React from 'react';
import Elements from '../../api/elements.js';

const ElementTypeNameLabel = (props) => (
  <span className="label label-default">
    {Elements.types.nameToHumanName(props.typeName)}
  </span>
);

export default ElementTypeNameLabel;
