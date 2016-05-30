import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Elements from '../../../api/elements/elements.js';
import ElementName from '../element-name.jsx';
import ElementTypeNameLabel from '../element-type-name-label.jsx';
import Children from './children.jsx';
import TreeToggler from './toggle-button.jsx';
import Buttons from './buttons.jsx';

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
    Elements.remove(this.props.element._id, this.props.element.parentId);
  }

  render() {
    const makeButtonsVisible = () => {
      this.setState({ buttonsVisible: true });
    };

    const makeButtonsNotVisible = () => {
      this.setState({ buttonsVisible: false });
    };

    const elementItselfStyle = () => {
      const style = {
        border: '1px solid #ddd',
        padding: '10px',
        borderRadius: '4px',
      };
      if (this.props.element._id === this.props.selectedElementId) {
        style.backgroundColor = '#337ab7';
        style.color = 'white';
        style.border = '1px solid transparent';
      }
      return style;
    };


    return (
      <div className="element" style={{ paddingTop: '5px' }}>
        <div
          onClick={() => this.props.setSelectedElementId(this.props.element._id)}
          onMouseEnter={makeButtonsVisible}
          onMouseLeave={makeButtonsNotVisible}
          style={elementItselfStyle()}
        >
          <TreeToggler
            toggleChildrenVisible={() =>
              this.setState({ childrenVisible: !this.state.childrenVisible })}
            childIds={this.props.element.childIds}
            childrenVisible={this.state.childrenVisible}
          />
          <div style={{ display: 'inline', paddingRight: '10px' }}>
            <ElementTypeNameLabel typeName={this.props.element.typeName} />
          </div>
          <ElementName elementName={this.props.element.name} elementId={this.props.element._id} />
          <Buttons
            buttonsVisible={this.state.buttonsVisible}
            element={this.props.element}
          />
        </div>
        <Children
          element={this.props.element}
          setSelectedElementId={this.props.setSelectedElementId}
          selectedElementId={this.props.selectedElementId}
          childrenVisible={this.state.childrenVisible}
        />
      </div>
    );
  }
}

Element.propTypes = {
  element: React.PropTypes.object.isRequired,
  subElements: React.PropTypes.array,
  setSelectedElementId: React.PropTypes.func.isRequired,
  selectedElementId: React.PropTypes.string,
};

export default createContainer(() => {
  return {
    elements: Elements.collection.find().fetch(),
  };
}, Element);

