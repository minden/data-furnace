import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Form, FormGroup, Col, Panel } from 'react-bootstrap';

import Elements from '../../../api/elements.js';
import ElementDetailsTitle from './element-details-title.jsx';

const elementDetailsTitle = (props) => {
  return new ElementDetailsTitle({ elementName: props.element.name, elementId: props.elementId });
};

const ElementDetails = (props) => (
  <Panel
    header={elementDetailsTitle(props)}
  >
    <Form horizontal>
      <FormGroup controlId="formHorizontalEmail">
        <Col sm={2} style={{ textAlign: 'right' }}>
          Type
        </Col>
        <Col sm={10}>
          {props.element.typeName}
        </Col>
      </FormGroup>
    </Form>
  </Panel>
);

ElementDetails.propTypes = {
  elementId: PropTypes.string.isRequired,
  element: PropTypes.object.isRequired,
};

export default createContainer((props) => {
  return {
    element: Elements.collection.findOne(props.elementId),
  };
}, ElementDetails);
