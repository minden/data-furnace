import React from 'react';
import MainNavBar from './main-nav-bar.jsx';


export default class App extends React.Component {
  render() {
    return (
      <div>
        <MainNavBar />
        {this.props.children}
      </div>
    );
  }
}
