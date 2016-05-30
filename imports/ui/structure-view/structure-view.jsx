import React from 'react';
import ElementTree from './element-tree/element-tree.jsx';
import ElementDetails from './element-details/element-details.jsx';

class StructureView extends React.Component {
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
    return (
      <div id="structure-view" className="container">
        <div className="row">
          <div className="col-md-8">
            <ElementTree
              setSelectedElementId={this.setSelectedElementId}
              selectedElementId={this.state.selectedElementId}
            />
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

export default StructureView;
