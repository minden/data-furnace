import React, { PropTypes } from 'react';
import ElementTree from './element-tree/element-tree.jsx';
import ElementDetails from './element-details/element-details.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import Elements from '../../api/elements/elements.js';

class DimensionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedElementId: undefined,
    };
    this.setSelectedElementId = this.setSelectedElementId.bind(this);
  }

  setSelectedElementId(elementId) {
    this.setState({ selectedElementId: elementId });
  }

  render() {
    if (!this.props.ready) return null;
    return (
      <div id="dimension-view" className="container">
        <div className="row">
          <div className="col-md-8">
            {/*  Not using react panel to be able to only display panel-heading
              and no panel-body */}
            <div className="panel panel-default">
              <div className="panel-heading" >
                <div className="panel-title">
                  Business Objects
                  <Button
                    className="glyphicon glyphicon-plus pull-right"
                    style={{ padding: '0px', border: '0px', backgroundColor: 'transparent' }}
                    onClick={() => Elements.add(undefined, 'businessObject')}
                  />
                </div>
              </div>
            </div>
            {this.props.businessObjects.map((businessObject) => (
              <ElementTree
                setSelectedElementId={this.setSelectedElementId}
                selectedElementId={this.state.selectedElementId}
                key={businessObject._id}
                businessObject={businessObject}
              />
            ))}
          </div>
          <div className="col-md-4">
            <ElementDetails
              elementId={this.state.selectedElementId}
              setSelectedElementId={this.setSelectedElementId}
            />
          </div>
        </div>
      </div>
    );
  }
}

DimensionView.propTypes = {
  ready: PropTypes.bool.isRequired,
  businessObjects: PropTypes.array.isRequired,
};

export default createContainer(() => {
  const elementHandler = Meteor.subscribe('elements');

  return {
    ready: elementHandler.ready(),
    businessObjects: Elements.collection.find({ typeName: 'businessObject' }).fetch(),
  };
}, DimensionView);
