import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { getRoutes } from '../imports/startup/client/routes.jsx';

Meteor.startup(() => {
  render(getRoutes(), document.getElementById('app'));
});
