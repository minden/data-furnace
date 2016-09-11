/* eslint-env mocha */
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Reports from '../../../api/reports/reports.js';
import Measures from '../../../api/measures/measures.js';
import Header from './header.jsx';
import Elements from '../../../api/elements/elements.js';
import $ from 'jquery';

describe('Header', () => {
  if (Meteor.isServer) return;
  let header;
  let reportId;

  describe('with an element filter', () => {
    let element;
    before(() => {
      const elementId = Elements.add(undefined, 'dimension');
      element = Elements.collection.findOne(elementId);
      reportId = Reports.add();
      Reports.filters.add(reportId, 'element', elementId);
      header = mount(
        <Header name={element.name} _id={elementId} reportId={reportId} type="element" />
      );
    });

    it('contains the name', () => {
      header.find('i').text().should.equal(` ${element.name}`);
    });

    it('shows the correct icon', () => {
      header.find('i.fa.fa-cube').should.have.length(1);
    });

    it('opens the remove modal on button click', () => {
      header.find('button').simulate('click');
      $('.remove-modal').length.should.equal(1);
    });
  });
  describe('with a measure filter', () => {
    let measure;
    before(() => {
      const measureId = Measures.add();
      measure = Measures.collection.findOne(measureId);
      reportId = Reports.add();
      Reports.filters.add(reportId, 'measure', measureId);
      header = mount(
        <Header name={measure.name} _id={measureId} reportId={reportId} type="measure" />
      );
    });

    it('contains the name', () => {
      header.find('i').text().should.equal(` ${measure.name}`);
    });

    it('shows the correct icon', () => {
      header.find('i.fa.fa-balance-scale').should.have.length(1);
    });

    it('shows the remove modal on button click', () => {
      header.find('button').simulate('click');
      $('.remove-modal').length.should.equal(2);
    });
  });
});
