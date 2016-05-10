import React from 'react';
import ElementTree from './element-tree.jsx';
import AddElementButton from './add-element-button.jsx';
import Elements from '../../api/elements.js';

const addElementButtonDivStyle = {
  border: '1px solid #ddd',
  backgroundColor: '#F8F8F8',
  padding: '10px',
};

const addElementButtonPossibleTypes =
  [Elements.types.find((element) => element.name === 'dimension')];

const StructureView = () =>
  <div id="structure-view" className="container">
    <div className="row">
      <div className="col-md-6">
        <div style={addElementButtonDivStyle}>
          <AddElementButton
            possibleTypes={addElementButtonPossibleTypes}
          />
        </div>
        <ElementTree />
      </div>
    </div>
  </div>;

export default StructureView;
