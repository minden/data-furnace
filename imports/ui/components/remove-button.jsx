import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

const RemoveButton = (props) => (
  <Button
    className="glyphicon glyphicon-trash pull-right"
    style={
      { padding: '0px', border: '0px',
        backgroundColor: 'transparent', color: '#DE4646' }
    }
    onClick={() => props.onClick()}
  />
);

RemoveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RemoveButton;
