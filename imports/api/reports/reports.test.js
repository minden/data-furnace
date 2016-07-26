/* eslint-env mocha */
import Reports from './reports.js';
import Elements from '../elements/elements.js';
import Measures from '../measures/measures.js';
import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';

describe('Reports', () => {
  if (Meteor.isClient) return;

  describe('collection', () => {
    it('should have the collection typical functions', () => {
      Reports.collection.find.should.be.a('function');
    });
  });

  describe('add', () => {
    let reportId;

    before(() => {
      resetDatabase();
      reportId = Reports.add();
    });

    it('creates a new report', () => {
      Reports.collection.find(reportId).count().should.equal(1);
    });
  });

  describe('remove', () => {
    let reportId;

    before(() => {
      resetDatabase();
      reportId = Reports.add();
      Reports.remove(reportId);
    });

    it('removes the report', () => {
      Reports.collection.find(reportId).count().should.equal(0);
    });
  });

  describe('addToTable', () => {
    let reportId;

    before(() => {
      reportId = Reports.add();
    });

    describe('with a measure', () => {
      before(() => {
        const measureId = Measures.add();
        Reports.addToTable(reportId, 'measure', measureId);
      });
      it('adds the measure to the report', () => {
        Reports.collection.findOne(reportId).measures.length.should.equal(1);
      });
    });

    describe('with an element', () => {
      before(() => {
        const elementId = Elements.add(undefined, 'dimension');
        Elements.characteristics.add(elementId, '2016');
        Reports.addToTable(reportId, 'element', elementId);
      });

      it('adds the element to the report', () => {
        Reports.collection.findOne(reportId).elements.length.should.equal(1);
      });

      it('with its characteristics', () => {
        const report = Reports.collection.findOne(reportId);
        report.elements[0].favCharacteristicIds.length.should.equal(1);
      });
    });
  });

  describe('toggleCharacteristic', () => {
    let reportId;
    let elementId;
    let characteristicId;

    before(() => {
      reportId = Reports.add();
      elementId = Elements.add(undefined, 'dimension');
      characteristicId = Elements.characteristics.add(elementId, '2016');
      Reports.addToTable(reportId, 'element', elementId);
      Meteor.call('Reports.toggleCharacteristic', reportId, elementId, characteristicId, true);
    });

    before((done) => {
      const interval = Meteor.setInterval(() => {
        if (Reports.collection.findOne(reportId)) {
          clearInterval(interval);
          done();
        }
      });
    });

    it('removes the characteristic from the report element', () => {
      const report = Reports.collection.findOne(reportId);
      const element = report.elements.find((elem) => elem._id === elementId);
      element.favCharacteristicIds.indexOf(characteristicId).should.equal(-1);
    });
  });

  describe('elements.swap', () => {
    let reportId;
    let elementOneId;
    let elementTwoId;

    before(() => {
      reportId = Reports.add();
      elementOneId = Elements.add(undefined, 'dimension');
      Reports.addToTable(reportId, 'element', elementOneId);
      elementTwoId = Elements.add(undefined, 'referenceObject');
      Reports.addToTable(reportId, 'element', elementTwoId);
      Reports.elements.swap(reportId, elementOneId, elementTwoId);
    });

    it('switches two elements', () => {
      const report = Reports.collection.findOne(reportId);
      report.elements.findIndex((element) => element._id === elementOneId).should.equal(1);
      report.elements.findIndex((element) => element._id === elementTwoId).should.equal(0);
    });
  });
});
