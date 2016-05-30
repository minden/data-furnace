import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Form, FormGroup, Col, Panel } from 'react-bootstrap';
import ElementDetailsAttributes from './element-details-attributes.jsx';

import Elements from '../../../api/elements/elements.js';
import ElementDetailsTitle from './element-details-title.jsx';
import ElementTypeNameLabel from '../element-type-name-label.jsx';
import InplaceEdit from '../../components/inplace-edit.jsx';

const elementDetailsTitle = (props) => {
  return new ElementDetailsTitle(
    {
      elementName: props.element.name,
      elementId: props.elementId,
      setSelectedElementId: props.setSelectedElementId,
    }
  );
};


const ElementDetails = (props) => {
  if (!props.element) {
    return null;
  }

  return (
    <Panel
      header={elementDetailsTitle(props)}
    >
      <Form horizontal>
        <FormGroup>
          <Col sm={4} style={{ textAlign: 'right' }}>
            Type
          </Col>
          <Col sm={8}>
            <ElementTypeNameLabel typeName={props.element.typeName} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={4} style={{ textAlign: 'right' }}>
            Description
          </Col>
          <Col sm={8}>
            <InplaceEdit
              text={props.element.description}
              onChange={(text) => Elements.setDescription(props.element._id, text)}
            />
          </Col>
        </FormGroup>
      </Form>
      <hr />
      <ElementDetailsAttributes attributes={props.element.attributes} elementId={props.element._id} />
    </Panel>
  );
}

ElementDetails.propTypes = {
  elementId: PropTypes.string.isRequired,
  element: PropTypes.object,
  setSelectedElementId: PropTypes.func.isRequired,
};

export default createContainer((props) => {
  return {
    element: Elements.collection.findOne(props.elementId),
  };
}, ElementDetails);
