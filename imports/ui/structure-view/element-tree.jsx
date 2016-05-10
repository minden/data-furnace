import React, {Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Elements from '../../api/elements.js';
import Element from './element.jsx';


export default class ElementTree extends React.Component {
  render() {
    const elementTreeStyle = {
      border: '1px solid #ddd',
      borderTop: 'none',
      padding: '7px',
    };
    return (
      <div id="element-tree" style={elementTreeStyle}>
        {this.props.elements.map(function(element) {
          return <Element key={element._id} data={element}/>;
        })}
      </div>
    );
  }
}

ElementTree.propTypes = {
  elements: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    elements: Elements.collection.find({parentId: {$exists: false}}).fetch(),
  };
}, ElementTree);
