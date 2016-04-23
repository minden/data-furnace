import React from 'react';
import {Navbar} from 'react-bootstrap';

export default class MainNavBar extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Blueprint
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    )
  }
}
