import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';

export default class MainNavBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.isActive = this.isActive.bind(this);
  }


  isActive(view) {
    return this.context.router.isActive(view);
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Blueprint
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem
            active={this.isActive('structure-view')}
            eventKey={'structure'}
          >
            <Link to="/structure-view">Structure View</Link>
          </NavItem>
          <NavItem
            active={this.isActive('measure-view')}
            eventKey={'measure'}
          >
            <Link to="measure-view">Measure View</Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

MainNavBar.contextTypes = {
  router: React.PropTypes.func.isRequired,
  history: React.PropTypes.object.isRequired,
};
