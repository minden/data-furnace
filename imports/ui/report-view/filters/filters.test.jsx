/* eslint-env mocha */
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Filters from './filters.jsx';
import Reports from '../../../api/reports/reports.js';
import Elements from '../../../api/elements/elements.js';
import Measures from '../../../api/measures/measures.js';
import ElementFilter from './element-filter.jsx';
import MeasureFilter from './measure-filter.jsx';

describe('Filters', () => {
  if (Meteor.isServer) return;
  describe('with no filters', () => {
    let filters;

    before(() => {
      filters = mount(<Filters report={{ filters: [] }} />);
    });

    it('should show an alert to add elements and measures', () => {
      filters.find('.alert').should.have.length(1);
    });
  });

  describe('with filters', () => {
    let filters;
    before(() => {
      const elementId = Elements.add(undefined, 'dimension');
      const measureId = Measures.add();
      const reportId = Reports.add();
      Reports.filters.add(reportId, 'element', elementId);
      Reports.filters.add(reportId, 'measure', measureId);
      const report = Reports.collection.findOne(reportId);
      filters = mount(<Filters report={report} />);
    });

    it('contains an ElementFilter component', () => {
      filters.find(ElementFilter).should.have.length(1);
    });

    it('contains a MeasureFilter component', () => {
      filters.find(MeasureFilter).should.have.length(1);
    });
  });
});
