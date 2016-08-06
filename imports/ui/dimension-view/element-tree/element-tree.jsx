import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Elements from '../../../api/elements/elements.js';
import Element from './element.jsx';
import { Button, Panel } from 'react-bootstrap';
import header from './header.jsx';

class ElementTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addDimensionButtonVisible: false,
    };
  }

  render() {
    return (
      <Panel
        className="element-tree"
        onMouseEnter={() => this.setState({ addDimensionButtonVisible: true })}
        onMouseLeave={() => this.setState({ addDimensionButtonVisible: false })}
        header={header(this.props.businessObject, this.props.readOnly)}
      >
        <div id="elements">
          {this.props.elements.map((element) => {
            return (
              <Element
                setSelectedElementId={this.props.setSelectedElementId}
                selectedElementId={this.props.selectedElementId}
                key={element._id}
                element={element}
                readOnly={this.props.readOnly}
                draggable={this.props.draggable}
              />
              );
          })}
          {this.state.addDimensionButtonVisible && !this.props.readOnly &&
            <div className="text-center" style={{ marginTop: '10px' }} >
              <Button onClick={() => Elements.add(this.props.businessObject._id, 'dimension')}>
                <i className="fa fa-plus"> Add new Dimension</i>
              </Button>
            </div>
          }
        </div>
      </Panel>
    );
  }
}

ElementTree.propTypes = {
  elements: PropTypes.array.isRequired,
  setSelectedElementId: PropTypes.func.isRequired,
  selectedElementId: PropTypes.string,
  readOnly: PropTypes.bool,
  draggable: PropTypes.bool,
  businessObject: PropTypes.object.isRequired,
};

export default createContainer((props) => {
  return {
    elements: Elements.collection.find(
      { parentId: props.businessObject._id, typeName: 'dimension' }
    ).fetch(),
  };
}, ElementTree);
