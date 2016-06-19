import React, { PropTypes } from 'react';
import Elements from '../../../api/elements/elements.js';

const TableHeadRow = (props) => {
  const element = Elements.collection.findOne(props.column.elementId);
  return (
    <tr key={props.column.elementId} >
      <td /><td />
      <td>
        {element.name}
      </td>
      {props.column.characteristics.map(
        (characteristic, i) => {
          return (
            <td>{characteristic.value}</td>
            );
        })}
    </tr>
  );
};

TableHeadRow.propTypes = {
  columns: PropTypes.array.isRequired,
  column: PropTypes.object.isRequired,
  position: PropTypes.number.isRequired,
};

export default TableHeadRow;
