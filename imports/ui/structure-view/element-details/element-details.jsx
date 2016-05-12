import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Form, FormGroup, Col, Panel } from 'react-bootstrap';

import Elements from '../../../api/elements.js';
import ElementDetailsTitle from './element-details-title.jsx';
import ElementTypeNameLabel from '../element-type-name-label.jsx';
import InplaceEdit from '../../components/inplace-edit.jsx';

const elementDetailsTitle = (props) => {
  return new ElementDetailsTitle({ elementName: props.element.name, elementId: props.elementId });
};


const ElementDetails = (props) => (
  <Panel
    header={elementDetailsTitle(props)}
  >
    <Form horizontal>
      <FormGroup>
        <Col sm={2} style={{ textAlign: 'right' }}>
          Type
        </Col>
        <Col sm={10}>
          <ElementTypeNameLabel typeName={props.element.typeName} />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col sm={2} style={{ textAlign: 'right' }}>
          Description
        </Col>
        <Col sm={10}>
          <InplaceEdit
            text={props.element.description}
            onChange={(text) => Elements.setDescription(props.element._id, text)}
          />
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
