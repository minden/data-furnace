import React, { PropTypes } from 'react';
import Elements from '../../../api/elements/elements.js';
import InplaceEdit from '../../components/inplace-edit.jsx';
import RemoveButton from '../../components/remove-button.jsx';

const Header = (businessObject, readOnly) => (
  <div>
    <InplaceEdit
      onChange={(text) => Elements.setName(businessObject._id, text)}
      text={businessObject.name}
    />
    <div className="pull-right">
      {!readOnly &&
        <RemoveButton
          onClick={() => Elements.remove(businessObject._id, undefined)}
          name={businessObject.name}
          type="Business Object"
        />
      }
    </div>
  </div>
);


Header.propTypes = {
  readOnly: PropTypes.bool,
  businessObject: PropTypes.object.isRequired,
};

export default Header;
