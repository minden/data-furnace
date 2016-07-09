import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

class CursorPlaceholder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false,
    };
  }

  componentDidMount() {
    this.shouldCursorFlash();
  }

  componentDidUpdate() {
    this.shouldCursorFlash();
  }

  componentWillUnMount() {
    this.shouldCursorFlash();
  }

  shouldCursorFlash() {
    if (this.isActive()) {
      if (this.cursorInterval) return;
      this.cursorInterval = setInterval(() => {
        this.setState({ on: !this.state.on });
      }, 800);
    } else {
      if (this.cursorInterval) {
        clearInterval(this.cursorInterval);
        this.cursorInterval = undefined;
        this.setState({ on: false });
      }
    }
  }

  isActive() {
    return this.props.cursor.expressionIdBefore === this.props.expressionId;
  }

  cursorStyle() {
    return {
      color: (this.state.on ? 'black' : 'white'),
      border: 'none',
      backgroundColor: 'white',
      cursor: 'text',
      outline: 'none',
    };
  }

  render() {
    return (
      <Button
        className="fa"
        style={this.cursorStyle()}
        onClick={() => this.props.setCursor({ expressionIdBefore: this.props.expressionId })}
      >
        |
      </Button>
    );
  }
}


CursorPlaceholder.propTypes = {
  cursor: PropTypes.object.isRequired,
  setCursor: PropTypes.func.isRequired,
  expressionId: PropTypes.string.isRequired,
};

export default CursorPlaceholder;
