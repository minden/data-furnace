import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { Glyphicon, OverlayTrigger, Popover, FormGroup, Checkbox } from 'react-bootstrap';
import Elements from '../../../api/elements/elements.js';

const ElementCharacteristicFilter = (props) => {
  const originalElement = Elements.collection.findOne(props.element._id);
  return (
    <OverlayTrigger
      trigger="click"
      placement="right"
      rootClose
      overlay={
        <Popover id={originalElement._id} title="Characteristics" >
          <FormGroup>
            {originalElement.characteristics.map((characteristic) => {
              return (
                <Checkbox
                  checked={isPresent(characteristic, props.element.favCharacteristicIds)}
                  onClick={() => Meteor.call('Reports.toggleCharacteristic',
                    props.reportId,
                    props.element._id,
                    characteristic._id,
                    isPresent(characteristic, props.element.favCharacteristicIds)
                  )}
                  key={characteristic._id}
                >
                  {characteristic.value}
                </Checkbox>
                );
            })}
          </FormGroup>
        </Popover>
        }
    >
      <Glyphicon className="pull-right" glyph="filter" />
    </OverlayTrigger>
  );
};

const isPresent = (characteristic, reportElementfavCharacteristicIds) => {
  return reportElementfavCharacteristicIds.indexOf(characteristic._id) > -1;
};

ElementCharacteristicFilter.propTypes = {
  element: PropTypes.object.isRequired,
  reportId: PropTypes.string.isRequired,
};

export default ElementCharacteristicFilter;
