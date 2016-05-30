import React, { PropTypes } from 'react';
import Elements from '../../../api/elements/elements.js';

const subElementsListStyle = {
  marginBottom: '0px',
  paddingLeft: '20px',
};

const getChildren = (childIds) => {
  return Elements.collection.find({ _id: { $in: childIds } }).fetch();
};

const Children = (props) => {
  if (this.state.childrenVisible === true) {
    return (
      <div className="list-group sub-elements-list" style={subElementsListStyle}>
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
  }
};

Children.propTypes = {
  element: PropTypes.object.isRequired,
  setSelectedElementId: PropTypes.func.isRequired,
  selectedElementId: PropTypes.string.isRequired,
};

export default Children;
