import React, { PropTypes } from 'react';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';

class RemoveButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.modalText = this.modalText.bind(this);
  }

  openModal() { this.setState({ showModal: true }); }

  closeModal() { this.setState({ showModal: false }); }

  modalText() {
    if (!(this.props.type && this.props.name)) {
      return 'Are you sure you want to remove this element?';
    }
    return `Are you sure you want to delete the ${this.props.type} ${this.props.name}?`;
  }

  render() {
    return (
      <div style={{ display: 'inline' }}>
        <Button
          className="glyphicon glyphicon-trash pull-right"
          style={
            { padding: '0px', border: '0px',
              backgroundColor: 'transparent', color: '#DE4646' }
          }
          onClick={this.openModal}
        />
        <Modal show={this.state.showModal} onHide={this.closeModal} className="remove-modal">
          <Modal.Body>
            <p>
              {this.modalText()}
            </p>
            <p className="pull-right">
              <ButtonToolbar>
                <Button
                  onClick={() => { this.closeModal(); this.props.onClick(); }}
                  style={{ color: '#DE4646' }}
                >
                  remove
                </Button>
                <Button onClick={this.closeModal}>cancel</Button>
              </ButtonToolbar>
            </p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

RemoveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
};

export default RemoveButton;
