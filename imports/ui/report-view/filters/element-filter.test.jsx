/* eslint-env mocha */
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Reports from '../../../api/reports/reports.js';
import Elements from '../../../api/elements/elements.js';
import Header from './header.jsx';
import ElementFilter from './element-filter.jsx';

describe('ElementFilter', () => {
  if (Meteor.isServer) return;
  let filter;
  let reportId;
  let characteristicId;

  before(() => {
    const elementId = Elements.add(undefined, 'dimension');
    characteristicId = Elements.characteristics.add(elementId, '2016');
    reportId = Reports.add();
    Reports.filters.add(reportId, 'element', elementId);
    const report = Reports.collection.findOne(reportId);
    filter = mount(<ElementFilter filter={report.filters[0]} reportId={reportId} />);
  });

  it('contains a Header component', () => {
    filter.find(Header).should.have.length(1);
  });

  it('displays the characteristics of the element', () => {
    filter.find('.checkbox-inline').text().should.equal('2016');
  });

  it('the characteristic is not yet checked', () => {
    filter.find('.checkbox-inline input[type="checkbox"][checked="checked"]').should.have.length(0);
    filter.find('.checkbox-inline input[type="checkbox"]').should.have.length(1);
  });

  it('adds the characteristic to the db on click', () => {
    filter.find('.checkbox-inline input').simulate('click');
    const report = Reports.collection.findOne(reportId);
    report.filters[0].favCharacteristicIds[0].should.equal(characteristicId);
  });

  it('removes the characteristic from the db on second click', () => {
    let report = Reports.collection.findOne(reportId);
    filter = mount(<ElementFilter filter={report.filters[0]} reportId={reportId} />);
    filter.find('.checkbox-inline input').simulate('click');
    report = Reports.collection.findOne(reportId);
    report.filters[0].favCharacteristicIds.should.have.length(0);
  });
});
