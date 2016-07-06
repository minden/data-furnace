/* eslint-env mocha */
import { shallow } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Reports from '../../../api/reports/reports.js';
import Elements from '../../../api/elements/elements.js';
import elementRows from './element-rows.jsx';
import { Table } from 'react-bootstrap';

describe('ElementRows', () => {
  if (Meteor.isServer) return;
  let rows;

  before(() => {
    const reportId = Reports.add();

    const elementOneId = Elements.add(undefined, 'dimension');
    Elements.characteristics.add(elementOneId, '2015');
    Elements.characteristics.add(elementOneId, '2016');
    Reports.addToTable(reportId, 'element', elementOneId);

    const elementTwoId = Elements.add(undefined, 'dimension');
    Elements.characteristics.add(elementTwoId, 'Jan');
    Elements.characteristics.add(elementTwoId, 'Feb');
    Reports.addToTable(reportId, 'element', elementTwoId);

    const report = Reports.collection.findOne(reportId);
    rows = shallow(<Table>{elementRows(reportId, report.elements)}</Table>);
  });

  describe('with two elements two characteristics each', () => {
    it('returns two rows', () => {
      rows.find('tr').should.have.length(2);
    });

    it('returns three cells in the first row', () => {
      rows.find('tr').at(0).find('td').should.have.length(3);
    });

    it('returns five cells in the second row', () => {
      // Hotfix to count cells. Duplicated cells are ignored otherwise.
      rows.find('tr').at(1).html().match(/<td/g).should.have.length(5);
    });
  });
});
