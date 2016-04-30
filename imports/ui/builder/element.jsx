import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Button } from 'react-bootstrap';
import Elements from '../../api/elements.js';
import AddElementButton from './add-element-button.jsx';

class Element extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childrenVisible: true,
      buttonsVisible: false,
    };
    console.log(this);
  }

  removeElement() {
    Elements.remove(this.props.data._id, this.props.data.parentId);
  }

  render() {
    const toggleButton = () => {
      const togglerClasses = () => {
        if (this.props.data.childIds.length === 0) {
          return '';
        } else {
          if (this.state.childrenVisible) {
            return 'glyphicon glyphicon-chevron-down';
          } else {
            return 'glyphicon glyphicon-chevron-right';
          }
        }
      };
      const toggleChildrenVisible = () => {
        this.setState({ childrenVisible: !this.state.childrenVisible });
      };
      return (
        <span className={togglerClasses()} onClick={toggleChildrenVisible} style={{ paddingRight: '10px' }}></span>
      );
    };

    const children = () => {
      const subElementsListStyle = {
        marginBottom: '0px',
        paddingLeft: '20px',
      };

      const getChildren = (childIds) => {
        return Elements.collection.find({ _id: { $in: childIds } }).fetch();
      };

      if (this.state.childrenVisible === true) {
        return (
          <div className="list-group sub-elements-list" style={subElementsListStyle}>
            {getChildren(this.props.data.childIds).map(function (element) {
              return <Element key={element._id} data={element} />;
            })}
          </div >
        );
      }
    };

    const buttons = () => {
      const buttonsStyle = {
        display: 'inline',
        float: 'right',
      };

      const removeButtonStyle = {
        border: 'none',
        padding: '0px',
        paddingTop: '1px',
        paddingLeft: '2px',
      };

      if (this.state.buttonsVisible) {
        return (
          <div className="buttons" style={buttonsStyle}>
            <AddElementButton elementId={this.props.data._id} />
            <Button
              className="glyphicon glyphicon-remove remove-element-button"
              onClick={this.removeElement.bind(this)}
              style={removeButtonStyle}
            ></Button>
          </div>
        );
      }
    };

    const makeButtonsVisible = () => {
      this.setState({ buttonsVisible: true });
    };

    const makeButtonsNotVisible = () => {
      this.setState({ buttonsVisible: false });
    };

    return (
      <div className="element" style={{ paddingTop: '5px' }}>
        <div
          onMouseEnter={makeButtonsVisible}
          onMouseLeave={makeButtonsNotVisible}
          style={{ border: '1px solid #ddd', padding: '10px' }}
        >
          {toggleButton()}
          {Elements.types.nameToHumanName(this.props.data.typeName)}
          {buttons()}
        </div>
        {children()}
      </div>
    );
  }
}

Element.propTypes = {
  data: React.PropTypes.object.isRequired,
  subElements: React.PropTypes.array,
};

export default createContainer((props) => {
  return {
    subElements: Elements.collection.find({ parentId: props.data._id }).fetch(),
  };
}, Element);

