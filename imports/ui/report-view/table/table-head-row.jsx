import React, { PropTypes } from 'react';
import Elements from '../../../api/elements/elements.js';

const TableHeadRow = (props) => {
  const element = Elements.collection.findOne(props.element.elementId);
  return (
    <tr key={props.element.elementId} >
      <td /><td />
      <td>
        {element.name}
      </td>
      {props.element.characteristics.map(
        (characteristic, i) => {
          return (
            <td>{characteristic.value}</td>
            );
        })}
    </tr>
  );
};

TableHeadRow.propTypes = {
  elements: PropTypes.array.isRequired,
  element: PropTypes.object.isRequired,
  position: PropTypes.number.isRequired,
};

export default TableHeadRow;
