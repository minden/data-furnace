/* eslint-env mocha */
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ElementCharacteristicFilter from './element-characteristic-filter.jsx';
import Elements from '../../../api/elements/elements.js';
import Reports from '../../../api/reports/reports.js';
import $ from 'jquery';

describe('ElementCharacteristicFilter', () => {
  if (Meteor.isServer) return;
  let filter;
  let reportId;

  before(() => {
    const elementId = Elements.add(undefined, 'hierarchy');
    Elements.characteristics.add(elementId, '2016');
    reportId = Reports.add();
    Reports.addToTable(reportId, 'element', elementId);
    const element = Reports.collection.findOne(reportId).elements[0];
    filter = mount(<ElementCharacteristicFilter element={element} reportId={reportId} />);
  });

  it('shows a filter glyphicon', () => {
    filter.find('span').hasClass('glyphicon glyphicon-filter').should.be.true;
  });

  describe('the popover', () => {
    before(() => {
      filter.find('span').simulate('click');
    });

    it('is triggered by a click on the filter icon', () => {
      $('.popover').should.have.length(1);
    });

    it('shows characteristic "2016"', () => {
      $('.popover label').text().should.equal('2016');
    });

    it('"2016" is checked', () => {
      $('.popover input:checkbox:checked').should.have.length(1);
    });

    it('removes the characteristic from the report on click on the checkbox', () => {
      $('.popover input:checkbox').click();
      Reports.collection.findOne(reportId).elements[0].favCharacteristicIds.should.have.length(0);
    });
  });
});
