import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import InplaceEdit from '../../../components/inplace-edit.jsx';
import RemoveButton from '../../../components/remove-button.jsx';
import Elements from '../../../../api/elements/elements.js';

const List = (props) => (
  <ListGroup>
    {props.element.characteristics.map((characteristic) => (
      <ListGroupItem key={characteristic._id}>
        <InplaceEdit
          text={characteristic.value}
          onChange={(text) =>
            Meteor.call(
              'elements.characteristics.setValue',
              props.element._id,
              characteristic._id,
              text
            )
          }
        />
        <RemoveButton
          onClick={() => Elements.characteristics.remove(props.element._id, characteristic._id)}
          name={characteristic.value}
          type="characteristic"
        />
      </ListGroupItem>
      ))
    }
  </ListGroup>
);

List.propTypes = {
  element: PropTypes.object.isRequired,
};

export default List;
