import React from 'react';
import ElementTree from './element-tree.jsx';
import AddElementButton from './add-element-button.jsx'; 
import Elements from '../../api/elements.js';

export default class Builder extends React.Component {
  render() {
    const addElementButtonDivStyle = {
      border: '1px solid #ddd',
      backgroundColor: '#F8F8F8',
      padding: '10px',
    };

    return (
      <div id="builder" className="container">
        <div className="row">
          <div className="col-md-6">
            <div style={addElementButtonDivStyle}>
              <AddElementButton possibleTypes={Elements.types} />
            </div>
            <ElementTree></ElementTree>
          </div>
        </div>
      </div>
    );
  }
}
