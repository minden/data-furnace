import InplaceEdit from '../../components/inplace-edit.jsx';
import React, { PropTypes } from 'react';
import { Form, FormGroup, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const setAttributeName = (elementId, attributeId, text) => {
  Meteor.call('elements.setAttributeName', elementId, attributeId, text);
};

const setAttributeType = (elementId, attributeId, text) => {
  Meteor.call('elements.setAttributeType', elementId, attributeId, text);
};

const ElementDetailsAttributes = (props) => (
  <Form horizontal>
    {props.attributes.map((attribute) => {
      return (
        <FormGroup>
          <Col sm={4} style={{ textAlign: 'right' }}>
            <InplaceEdit
              text={attribute.name}
              onChange={(text) => setAttributeName(props.elementId, attribute._id, text)}
            />
          </Col>
          <Col sm={8}>
            <InplaceEdit
              text={attribute.type}
              onChange={(text) => setAttributeType(props.elementId, attribute._id, text)}
            />
          </Col>
        </FormGroup>
        );
    })}
  </Form>
);

ElementDetailsAttributes.propTypes = {
  attributes: PropTypes.array.isRequired,
  elementId: PropTypes.string.isRequired,
};

export default ElementDetailsAttributes;