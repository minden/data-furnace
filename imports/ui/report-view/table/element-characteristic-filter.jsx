import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { Glyphicon, OverlayTrigger, Popover, FormGroup, Checkbox } from 'react-bootstrap';
import Elements from '../../../api/elements/elements.js';

const ElementCharacteristicFilter = (props) => {
  const originalElement = Elements.collection.findOne(props.element.elementId);
  return (
    <OverlayTrigger
      trigger="click"
      placement="right"
      rootClose
      overlay={
        <Popover title="Characteristics" >
          <FormGroup>
            {originalElement.characteristics.map((characteristic) => {
              return (
                <Checkbox
                  checked={isPresent(characteristic, props.element.characteristicIds)}
                  onClick={() => Meteor.call('Reports.toggleCharacteristic',
                    props.reportId,
                    props.element.elementId,
                    characteristic._id,
                    isPresent(characteristic, props.element.characteristicIds)
                  )}
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

const isPresent = (characteristic, reportElementCharacteristicIds) => {
  return reportElementCharacteristicIds.indexOf(characteristic._id) > -1;
};

ElementCharacteristicFilter.propTypes = {
  element: PropTypes.object.isRequired,
  reportId: PropTypes.string.isRequired,
};

export default ElementCharacteristicFilter;
