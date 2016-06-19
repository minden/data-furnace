import React from 'react';
import Elements from '../../../api/elements/elements.js';

const ElementRows = (elements) => {
  const rows = [];
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    rows.push(
      <tr>
        <td />
        <td>{Elements.getName(element.elementId)}</td>
        {characteristicsCells(elements, element, i)}
      </tr>
    );
  }
  return rows;
};

const characteristicsCells = (elements, element, index) => {
  const cells = [];
  for (const characteristic of element.characteristics) {
    cells.push(
      <td colSpan={amountCharacteristicsAfter(elements, index)}>{characteristic.value}</td>
    );
  }
  return repeatArray(cells, amountCharacteristicsBefore(elements, index));
};

const amountCharacteristicsBefore = (elements, index) => {
  let amount = 1;
  for (let i = 0; i < index; i++) {
    amount *= elements[i].characteristics.length;
  }
  return amount;
};

const amountCharacteristicsAfter = (elements, index) => {
  let amount = 1;
  for (let i = index; i < elements.length; i++) {
    amount *= elements[i].characteristics.length;
  }
  return amount;
};

const repeatArray = (array, times) => {
  const result = [];
  for (let i = 0; i < times; i++) {
    array.forEach((element) => {
      result.push(element);
    });
  }
  return result;
};

export default ElementRows;
