/* eslint-env mocha */
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Reports from '../../../api/reports/reports.js';
import Measures from '../../../api/measures/measures.js';
import Header from './header.jsx';
import MeasureFilter from './measure-filter.jsx';

describe('MeasureFilter', () => {
  if (Meteor.isServer) return;
  let filter;
  let reportId;

  before(() => {
    const measureId = Measures.add();
    reportId = Reports.add();
    Reports.filters.add(reportId, 'measure', measureId);
    const report = Reports.collection.findOne(reportId);
    filter = mount(<MeasureFilter filter={report.filters[0]} reportId={reportId} />);
  });

  it('contains a Header component', () => {
    filter.find(Header).should.have.length(1);
  });
});
