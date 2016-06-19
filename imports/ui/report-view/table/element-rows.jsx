import React from 'react';
import Elements from '../../../api/elements/elements.js';
import ElementCharacteristicFilter from './element-characteristic-filter.jsx';

const ElementRows = (reportId, elements) => {
  const rows = [];
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    rows.push(
      <tr>
        <td />
        <td>
          {Elements.getName(element._id)}
        </td>
        <td>
          <ElementCharacteristicFilter
            element={element}
            reportId={reportId}
          />
        </td>
        {characteristicsCells(reportId, elements, element, i)}
      </tr>
    );
  }
  return rows;
};

const characteristicsCells = (reportId, elements, element, index) => {
  const cells = [];
  for (const characteristicId of element.characteristicIds) {
    const characteristic = Elements.characteristics.get(element._id, characteristicId);
    cells.push(
      <td
        colSpan={amountCharacteristicsAfter(elements, index)}
        style={{ textAlign: 'center' }}
      >
        {characteristic.value}
      </td>
    );
  }
  return repeatArray(cells, amountCharacteristicsBefore(elements, index));
};

const amountCharacteristicsBefore = (elements, index) => {
  let amount = 1;
  for (let i = 0; i < index; i++) {
    amount *= elements[i].characteristicIds.length;
  }
  return amount;
};

const amountCharacteristicsAfter = (elements, index) => {
  let amount = 1;
  for (let i = index + 1; i < elements.length; i++) {
    amount *= elements[i].characteristicIds.length;
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
