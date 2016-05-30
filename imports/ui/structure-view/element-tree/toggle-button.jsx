import React, { PropTypes } from 'react';

const ToggleButton = (props) => {
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
      style={{ paddingRight: '10px' }}
    ></span>
  );
};

ToggleButton.propTypes = {
  toggleChildrenVisible: PropTypes.func.isRequired,
  childIds: PropTypes.array.isRequired,
  childrenVisible: PropTypes.bool.isRequired,
};

export default ToggleButton;
