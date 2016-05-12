import React, { PropTypes } from 'react';

import ElementName from '../element-name.jsx';

const ElementDetailsTitle = (props) => (
  <ElementName elementName={props.elementName} elementId={props.elementId} />
);

ElementDetailsTitle.propTypes = {
  elementName: PropTypes.string,
  elementId: PropTypes.string.isRequired,
};

export default ElementDetailsTitle;
