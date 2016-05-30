import React, { PropTypes } from 'react';
import Elements from '../../../api/elements/elements.js';
import Element from './element.jsx';

const getChildren = (childIds) => {
  return Elements.collection.find({ _id: { $in: childIds } }).fetch();
};

const Children = (props) => {
  if (!props.childrenVisible) {
    return null;
  }
  return (
    <div
      className="list-group sub-elements-list"
      style={{ marginBottom: '0px', paddingLeft: '20px' }}
    >
      {getChildren(props.element.childIds).map((element) => {
        return (
          <Element
            setSelectedElementId={props.setSelectedElementId}
            selectedElementId={props.selectedElementId}
            key={element._id}
            element={element}
          />
          );
      })}
    </div >
  );
};

Children.propTypes = {
  element: PropTypes.object.isRequired,
  setSelectedElementId: PropTypes.func.isRequired,
  selectedElementId: PropTypes.string,
  childrenVisible: PropTypes.bool.isRequired,
};

export default Children;
