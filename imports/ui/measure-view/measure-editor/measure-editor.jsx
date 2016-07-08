import React, { PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import Measures from '../../../api/measures/measures.js';
import toolbox from './toolbox.jsx';
import Expressions from './expressions/expressions.jsx';
import header from './header.jsx';
import { createContainer } from 'meteor/react-meteor-data';

class MeasureEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursor: { afterExpressionId: undefined },
    };
    this.setCursor = this.setCursor.bind(this);
  }

  setCursor(cursor) {
    this.setState({ cursor });
  }

  render() {
    if (!this.props.measure) {
      return null;
    }

    return (
      <Panel
        header={header({ measure: this.props.measure })}
        footer={toolbox({
          measureId: this.props.measure._id, cursor: this.state.cursor, setCursor: this.setCursor,
        })}
      >
        <Expressions
          measure={this.props.measure}
          cursor={this.state.cursor}
          setCursor={this.setCursor}
        />
      </Panel>
    );
  }
}

MeasureEditor.propTypes = {
  measure: PropTypes.object,
  selectedMeasureId: PropTypes.string,
};

export default createContainer((props) => {
  return {
    measure: Measures.collection.findOne(props.selectedMeasureId),
  };
}, MeasureEditor);

