import React, { PropTypes } from 'react';
import { ListGroupItem, Checkbox } from 'react-bootstrap';
import Elements from '../../../api/elements/elements.js';
import Header from './header.jsx';
import { Meteor } from 'meteor/meteor';

const ElementFilter = (props) => {
  const element = Elements.collection.findOne(props.filter._id);
  return (
    <ListGroupItem
      header={
        <Header name={element.name} _id={element._id} reportId={props.reportId} type="element" />
      }
    >
      {element.characteristics.map((characteristic) => (
        <Checkbox
          inline
          checked={isActive(props.filter, characteristic._id)}
          onClick={() => Meteor.call('Reports.filters.toggleCharacteristic',
            props.reportId,
            props.filter._id,
            characteristic._id,
            isActive(props.filter, characteristic._id)
          )}
        >
          {characteristic.value}
        </Checkbox>
        ))}
    </ListGroupItem>
  );
};

ElementFilter.propTypes = {
  filter: PropTypes.object.isRequired,
  reportId: PropTypes.string.isRequired,
};

const isActive = (filter, characteristicId) => {
  return filter.favCharacteristicIds.indexOf(characteristicId) !== -1;
};

export default ElementFilter;
