/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { should } from 'chai';
import Measures from './measures.js';
import { resetDatabase } from 'meteor/xolvio:cleaner';
should();

if (Meteor.isServer) {
  describe('Measures.collection', () => {
    it('should have the collection typical functions', () => {
      Measures.collection.find.should.be.a('function');
    });
  });

  describe('Measures.add', () => {
    let measureId;

    before(() => {
      resetDatabase();
      measureId = Measures.add();
    });

    it('should add a new measure to the db', () => {
      Measures.collection.find().count().should.equal(1);
    });

    it('should return a valid measureid', () => {
      measureId.should.be.a('string');
      Measures.collection.findOne(measureId).should.be.an('object');
    });
  });

  describe('Measures.setName', () => {
    let measureId;
    const newMeasureName = 'My awesome new meaure name';

    before(() => {
      resetDatabase();
      measureId = Measures.add();
      Measures.setName(measureId, newMeasureName);
    });

    it('should rename the measure in the db', () => {
      Measures.collection.findOne(measureId).name.should.equal(newMeasureName);
    });
  });
}
