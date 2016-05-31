/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { should, expect } from 'chai';
should();
import Elements from './elements.js';

if (Meteor.isServer) {
  describe('Elements', () => {
    it('should be an object', () => {
      Elements.should.be.an('object');
    });
  });

  describe('Elements.collection', () => {
    it('should be a collection', () => {
      Elements.collection.should.have.property('_collection');
    });
  });

  describe('Elements.add', () => {
    it('should insert an element into the MongoDB', () => {
      const element = { parentId: null, typeName: 'hierarchy' };
      element._id = Elements.add(element.parentId, element.typeName);
      const elementFromDB = Elements.collection.findOne(element._id);
      elementFromDB.typeName.should.equal(element.typeName);
    });
  });

  describe('Elements.remove', () => {
    let elementId;

    before(() => {
      elementId = Elements.add(undefined, 'hierarchy');
      Elements.remove(elementId, undefined);
    });

    it('should remove an Element from the database', () => {
      expect(Elements.collection.findOne(elementId)).to.not.exist;
    });
  });

  describe('Elements.types.nameToHumanName', () => {
    it('should return "Reference object" on "referenceObject"', () => {
      Elements.types.nameToHumanName('referenceObject').should.equal('Reference object');
    });
  });
}
