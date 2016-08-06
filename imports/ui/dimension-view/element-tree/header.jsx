import React, { PropTypes } from 'react';
import Elements from '../../../api/elements/elements.js';
import { Button } from 'react-bootstrap';
import InplaceEdit from '../../components/inplace-edit.jsx';

const Header = (businessObject, readOnly) => (
  <div>
    <InplaceEdit
      onChange={(text) => Elements.setName(businessObject._id, text)}
      text={businessObject.name}
    />
    <div className="pull-right">
      {!readOnly &&
        <Button
          className="glyphicon glyphicon-trash pull-right"
          style={
            { padding: '0px', paddingLeft: '5px', border: '0px',
              backgroundColor: 'transparent', color: '#DE4646' }
          }
          onClick={() => Elements.remove(businessObject._id, undefined)}
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
