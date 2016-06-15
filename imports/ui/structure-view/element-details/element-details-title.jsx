import React, { PropTypes } from 'react';

import ElementName from '../element-name.jsx';
import ElementParentBreadCrumbs from './element-parent-breadcrumbs.jsx';

const ElementDetailsTitle = (props) => (
  <div>
    <ElementParentBreadCrumbs
      elementId={props.elementId}
      setSelectedElementId={props.setSelectedElementId}
    />
    <ElementName elementName={props.elementName} elementId={props.elementId} />
  </div>
);

ElementDetailsTitle.propTypes = {
  elementName: PropTypes.string,
  elementId: PropTypes.string.isRequired,
  setSelectedElementId: PropTypes.func.isRequired,
};

export default ElementDetailsTitle;
