/*eslint no-param-reassign: "0"*/
import React from 'react';
import Reports from '../../../api/reports/reports.js';
import Elements from '../../../api/elements/elements.js';
import ElementCharacteristicFilter from './element-characteristic-filter.jsx';
import { Button } from 'react-bootstrap';

const ElementRows = (reportId, elements) => {
  if (elements.length === 0) return;
  const rows = [];
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    rows.push(
      <tr
        style={lastRowStyle(i === elements.length -1)}
        className="element-row"
        draggable
        onDragStart={(ev) => {
          ev.dataTransfer.setData('text/id', element._id);
          ev.dataTransfer.setData('text/type', 'swap-element');
          ev.dataTransfer.dropEffekt = 'move';
        }}
        onDrop={(ev) => {
          if (ev.dataTransfer.getData('text/type') !== 'swap-element') return;
          Reports.elements.swap(
            reportId,
            ev.dataTransfer.getData('text/id'),
            element._id
          );
        }}
        onDragOver={(ev) => {
          if (ev.dataTransfer.getData('text/type') !== 'swap-element') return;
          ev.preventDefault(); ev.dataTransfer.dropEffect = 'move';
        }}
      >
        <td style={{ borderRight: '3px solid #ddd' }}>
          <ElementCharacteristicFilter
            element={element}
            reportId={reportId}
          />
          &nbsp;{Elements.getName(element._id)}
          <Button
            className="glyphicon glyphicon-trash pull-right"
            style={
              { padding: '0px', border: '0px',
                backgroundColor: 'transparent', color: '#DE4646' }
            }
            onClick={() => Reports.elements.remove(reportId, element._id)}
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
  for (const characteristicId of element.favCharacteristicIds) {
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
    amount *= elements[i].favCharacteristicIds.length;
  }
  return amount;
};

const amountCharacteristicsAfter = (elements, index) => {
  let amount = 1;
  for (let i = index + 1; i < elements.length; i++) {
    amount *= elements[i].favCharacteristicIds.length;
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

const lastRowStyle = (isLastChild) => {
  if (isLastChild) {
    return { borderBottom: '3px solid #ddd' };
  }
};

export default ElementRows;
