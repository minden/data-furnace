import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { ListGroup, ListGroupItem, Glyphicon, Button } from 'react-bootstrap';
import InplaceEdit from '../../../components/inplace-edit.jsx';
import Elements from '../../../../api/elements/elements.js';

const List = (props) => (
  <ListGroup>
    {props.element.characteristics.map((characteristic) => (
      <ListGroupItem>
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
        <Button
          className="pull-right"
          onClick={() => Elements.characteristics.remove(props.element._id, characteristic._id)}
          style={{ color: '#DE4646', border: 'none', padding: '0px' }}
        >
          <Glyphicon className="pull-right" glyph="trash" />
        </Button>
      </ListGroupItem>
      ))
    }
  </ListGroup>
);

List.propTypes = {
  element: PropTypes.object.isRequired,
};

export default List;
