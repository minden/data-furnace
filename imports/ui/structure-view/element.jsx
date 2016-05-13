import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Button } from 'react-bootstrap';
import Elements from '../../api/elements.js';
import AddElementButton from './add-element-button.jsx';
import ElementName from './element-name.jsx';
import ElementTypeNameLabel from './element-type-name-label.jsx';

class Element extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childrenVisible: true,
      buttonsVisible: false,
    };
    this.removeElement = this.removeElement.bind(this);
  }

  removeElement() {
    Elements.remove(this.props.data._id, this.props.data.parentId);
  }

  render() {
    const toggleButton = () => {
      const togglerClasses = () => {
        if (this.props.data.childIds && this.props.data.childIds.length === 0) {
          return '';
        }
        if (this.state.childrenVisible) {
          return 'glyphicon glyphicon-chevron-down';
        }
        return 'glyphicon glyphicon-chevron-right';
      };
      const toggleChildrenVisible = () => {
        this.setState({ childrenVisible: !this.state.childrenVisible });
      };
      return (
        <span
          className={togglerClasses()}
          onClick={toggleChildrenVisible}
          style={{ paddingRight: '10px' }}
        ></span>
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
            {getChildren(this.props.data.childIds).map((element) => {
              return (
                <Element
                  setSelectedElementId={this.props.setSelectedElementId}
                  key={element._id}
                  data={element}
                />
                );
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

      const possibleChildTypes = () => {
        const currentType =
          Elements.types.find((element) => element.name === this.props.data.typeName);
        return Elements.types.filter((type) => {
          if (currentType.possibleChildren.indexOf(type.name) === -1) {
            return false;
          }
          return true;
        });
      };

      if (this.state.buttonsVisible) {
        return (
          <div className="buttons" style={buttonsStyle}>
            <AddElementButton
              elementId={this.props.data._id}
              possibleTypes={possibleChildTypes()}
            />
            <Button
              className="glyphicon glyphicon-remove remove-element-button"
              onClick={this.removeElement}
              style={removeButtonStyle}
            />
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
          onClick={() => this.props.setSelectedElementId(this.props.data._id)}
          onMouseEnter={makeButtonsVisible}
          onMouseLeave={makeButtonsNotVisible}
          style={{ border: '1px solid #ddd', padding: '10px' }}
        >
          {toggleButton()}
          <div style={{ display: 'inline', paddingRight: '10px' }}>
            <ElementTypeNameLabel typeName={this.props.data.typeName} />
          </div>
          <ElementName elementName={this.props.data.name} elementId={this.props.data._id} />
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
  setSelectedElementId: React.PropTypes.func.isRequired,
};

export default createContainer(() => {
  return {
    elements: Elements.collection.find().fetch(),
  };
}, Element);

