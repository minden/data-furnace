import { Meteor } from 'meteor/meteor';
import Reports from '../imports/api/reports/reports.js';

Meteor.publish('reports', () => {
  return Reports.collection.find();
});
