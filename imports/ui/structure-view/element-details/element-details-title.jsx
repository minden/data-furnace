import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';


import ElementName from '../element-name.jsx';
import Elements from '../../../api/elements/elements.js';
import ElementParentBreadCrumbs from './element-parent-breadcrumbs.jsx';

const addAttribute = (elementId) => {
  Elements.attributes.add(elementId);
};

const ElementDetailsTitle = (props) => (
  <div>
    <ElementParentBreadCrumbs
      elementId={props.elementId}
      setSelectedElementId={props.setSelectedElementId}
    />
    <ElementName elementName={props.elementName} elementId={props.elementId} />
    <Button
      className="glyphicon glyphicon-plus pull-right"
      style={{ padding: '0px', border: '0px', backgroundColor: 'transparent' }}
      onClick={() => addAttribute(props.elementId)}
    />
  </div>
);

ElementDetailsTitle.propTypes = {
  elementName: PropTypes.string,
  elementId: PropTypes.string.isRequired,
  setSelectedElementId: PropTypes.func.isRequired,
};

export default ElementDetailsTitle;
