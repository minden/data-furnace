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
            <i className="fa fa-fire"></i> &nbsp;DataFurnace
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem
            style={{ color: 'white' }}
            active={this.isActive('structure-view')}
            onClick={() => this.goTo('/structure-view')}
          >
            <i className="fa fa-cube"></i> &nbsp;
            Structure View
          </NavItem>
          <NavItem
            style={{ color: 'white' }}
            active={this.isActive('measure-view')}
            onClick={() => this.goTo('/measure-view')}
          >
            <i className="fa fa-balance-scale"></i> &nbsp;
            Measure View
          </NavItem>
          <NavItem
            style={{ color: 'white' }}
            active={this.isActive('report-view')}
            onClick={() => this.goTo('/report-view')}
          >
            <i className="fa fa-newspaper-o"></i> &nbsp;
            Report View
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

MainNavBar.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
