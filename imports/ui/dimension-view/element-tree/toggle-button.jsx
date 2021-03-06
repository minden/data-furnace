import React, { PropTypes } from 'react';

const TreeToggler = (props) => {
  if (props.childIds.length === 0) {
    return null;
  }

  const togglerClasses = () => {
    if (props.childrenVisible) {
      return 'glyphicon glyphicon-chevron-down';
    }
    return 'glyphicon glyphicon-chevron-right';
  };

  return (
    <span
      className={togglerClasses()}
      onClick={props.toggleChildrenVisible}
      style={{ paddingRight: '10px', cursor: 'pointer' }}
    ></span>
  );
};

TreeToggler.propTypes = {
  toggleChildrenVisible: PropTypes.func.isRequired,
  childIds: PropTypes.array.isRequired,
  childrenVisible: PropTypes.bool.isRequired,
};

export default TreeToggler;
