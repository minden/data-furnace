import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import Builder from '../imports/ui/builder/builder.jsx';
import MainNavBar from '../imports/ui/main-nav-bar.jsx';

Meteor.startup(() => {
  render(<div><MainNavBar/><Builder/></div>, document.getElementById('app'));
});
