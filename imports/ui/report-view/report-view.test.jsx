/* eslint-env mocha */
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import ReportView from './report-view.jsx';
import Report from './report.jsx';
import MeasureExplorer from '../measure-view/measure-explorer.jsx';
import ElementTree from '../dimension-view/element-tree/element-tree.jsx';
import React from 'react';
import Elements from '../../api/elements/elements.js';
import Reports from '../../api/reports/reports.js';

describe('ReportView', () => {
  if (Meteor.isServer) return;
  let reportView;

  before((done) => {
    Elements.add(undefined, 'businessObject');
    Reports.add();
    reportView = mount(<ReportView />);

    const interval = setInterval(() => {
      if (reportView.find('ReportView').props().ready) {
        clearInterval(interval);
        done();
      }
    });
  });

  it('should have one ElementTree component', () => {
    reportView.find(ElementTree).should.have.length(1);
  });

  it('should have one Report component', () => {
    reportView.find(Report).should.have.length(1);
  });

  it('should have one MeasureExplorer component', () => {
    reportView.find(MeasureExplorer).should.have.length(1);
  });
});
