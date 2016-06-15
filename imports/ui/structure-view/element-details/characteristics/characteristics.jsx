import React, { PropTypes } from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import Elements from '../../../../api/elements/elements.js';
import List from './list.jsx';

const handleSubmit = (event, elementId) => {
  event.preventDefault();
  const inputElement = event.target.getElementsByClassName('characteristic-input')[0];
  const value = inputElement.value;

  if (value.trim().length === 0) {
    return;
  }

  inputElement.value = '';
  Elements.characteristics.add(elementId, value);
};

const ElementDetailsCharacteristics = (props) => (
  <form onSubmit={(event) => handleSubmit(event, props.element._id)}>
    <FormGroup>
      <InputGroup>
        <FormControl
          className="characteristic-input"
          type="text"
          placeholder="New characteristic"
        />
        <InputGroup.Button>
          <Button type="submit">add</Button>
        </InputGroup.Button>
      </InputGroup>
    </FormGroup>
    <List element={props.element} />
  </form>
);

ElementDetailsCharacteristics.propTypes = {
  element: PropTypes.object.isRequired,
};

export default ElementDetailsCharacteristics;
