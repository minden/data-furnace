/* eslint-env mocha */
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Reports from '../../../api/reports/reports.js';
import Elements from '../../../api/elements/elements.js';
import Measures from '../../../api/measures/measures.js';
import ReportTable from './table.jsx';
import { Table } from 'react-bootstrap';

describe('ReportTable', () => {
  if (Meteor.isServer) return;
  let table;
  let measureId;

  before(() => {
    const reportId = Reports.add();
    const elementId = Elements.add(undefined, 'dimension');
    measureId = Measures.add();
    Measures.setName(measureId, 'The measure name');
    Reports.addToTable(reportId, 'element', elementId);
    Reports.addToTable(reportId, 'measure', measureId);
    const report = Reports.collection.findOne(reportId);
    table = mount(<ReportTable report={report} />);
  });

  it('contains a table', () => {
    table.find(Table).should.have.length(1);
  });

  it('has two rows', () => {
    table.find('tr').should.have.length(2);
  });

  it('displays the name of the measure', () => {
    table.find('tr').at(1).text().should.equal('The measure name');
  });

  describe('ReportTable without elements or measures', () => {
    before(() => {
      table = mount(<ReportTable report={{ elements: [], measures: [] }} />);
    });

    it('should show an alert to add elements and measures', () => {
      table.find('.alert').should.have.length(1);
    });
  });
});
