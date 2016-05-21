import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class MainNavBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.isActive = this.isActive.bind(this);
  }

  isActive(view) {
    return this.context.router.isActive(view);
  }

  goTo(location) {
    this.context.router.push(location);
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand style={{ color: '#DE4646' }}>
            DataFurnace
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem
            style={{ color: 'white' }}
            active={this.isActive('structure-view')}
            onClick={() => this.goTo('/structure-view')}
          >
            Structure View
          </NavItem>
          <NavItem
            style={{ color: 'white' }}
            active={this.isActive('measure-view')}
            onClick={() => this.goTo('/measure-view')}
          >
            Measure View
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

MainNavBar.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
