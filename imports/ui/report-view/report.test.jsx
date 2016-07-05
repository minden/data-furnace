/* eslint-env mocha */
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import { ReportWithoutContainer } from './report.jsx';
import ReportTable from './table/table.jsx';
import React from 'react';
import Reports from '../../api/reports/reports.js';
import Measures from '../../api/measures/measures.js';
import Elements from '../../api/elements/elements.js';

describe('Report', () => {
  if (Meteor.isServer) return;
  let report;
  let reportId;

  before((done) => {
    const handle = Meteor.subscribe('reports');
    const interval = setInterval(() => {
      if (handle.ready()) {
        clearInterval(interval);
        done();
      }
    });
  });

  before(() => {
    reportId = Reports.add();
    const reportData = Reports.collection.findOne(reportId);
    report = mount(<ReportWithoutContainer report={reportData} ready />);
  });

  it('should contain the ReportTable component', () => {
    report.find(ReportTable).should.have.length(1);
  });

  describe('on measure drop', () => {
    let measureId;

    before(() => {
      measureId = Measures.add();
      const sampleEvent = {
        dataTransfer: {
          getData: (input) => {
            if (input === 'text/type') {
              return 'measure';
            }
            return measureId;
          },
        },
      };
      console.log(report.find('.panel .report-table-wrapper').html());
      report.find('.panel .report-table-wrapper').simulate('drop', sampleEvent);
    });

    it('adds a new measure to the report', () => {
      Reports.collection.findOne(reportId).measures[0]._id.should.equal(measureId);
    });
  });

  describe('on element drop', () => {
    let elementId;

    before(() => {
      elementId = Elements.add(null, 'hierarchy');
      const sampleEvent = {
        dataTransfer: {
          getData: (input) => {
            if (input === 'text/type') {
              return 'element';
            }
            return elementId;
          },
        },
      };
      report.find('.panel .report-table-wrapper').simulate('drop', sampleEvent);
    });

    it('adds a new element to the report', () => {
      Reports.collection.findOne(reportId).elements[0]._id.should.equal(elementId);
    });
  });

  describe('Header', () => {
    it('should show "Report" as a title', () => {
      report.find('.panel-title').text().should.equal('Report');
    });

    it('should contain a Button', () => {
      report.find('.panel-title button').should.have.length(1);
    });

    it('removes the report when clicking the button', (done) => {
      report.find('.panel-title button').simulate('click');
      const interval = setInterval(() => {
        if (Reports.collection.find(reportId).count() === 0) {
          clearInterval(interval);
          done();
        }
      });
    });
  });
});

