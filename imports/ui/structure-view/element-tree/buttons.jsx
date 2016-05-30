import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import AddElementButton from './add-element-button.jsx';
import Elements from '../../../api/elements/elements.js';

const Buttons = (props) => {
  if (!props.buttonsVisible) {
    return null;
  }

  return (
    <div className="buttons" style={{ display: 'inline', float: 'right' }}>
      <AddElementButton
        elementId={props.element._id}
        possibleTypeNames={Elements.types
          .find((type) => type.name === props.element.typeName)
          .possibleChildren}
      />
      <Button
        className="glyphicon glyphicon-remove remove-element-button"
        onClick={() => Elements.remove(props.element._id, props.element.parentId)}
        style={{
          border: 'none',
          padding: '1px 0px 0px 5px',
          backgroundColor: 'transparent',
        }}
      />
    </div>
  );
};

Buttons.propTypes = {
  buttonsVisible: PropTypes.bool.isRequired,
  element: PropTypes.object.isRequired,
};

export default Buttons;
