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
      const element = { parentId: null, typeName: 'dimensionLevel' };
      element._id = Elements.add(element.parentId, element.typeName);
      const elementFromDB = Elements.collection.findOne(element._id);
      elementFromDB.typeName.should.equal(element.typeName);
    });
  });

  describe('Elements.remove', () => {
    let elementId;

    before(() => {
      elementId = Elements.add(undefined, 'dimensionLevel');
      Elements.remove(elementId, undefined);
    });

    it('should remove an Element from the database', () => {
      expect(Elements.collection.findOne(elementId)).to.not.exist;
    });
  });

  describe('Elements.types', () => {
    for (const type of Elements.types) {
      describe(type.humanName, () => {
        it('should have property humanName of type string', () => {
          type.should.have.property('humanName');
          type.humanName.should.be.a('string');
        });

        it('should have property name of type string', () => {
          type.should.have.property('name');
          type.name.should.be.a('string');
        });

        it('should have property possibleChildren of type array', () => {
          type.should.have.property('possibleChildren');
          type.possibleChildren.should.be.an('array');
        });
      });
    }
  });

  describe('Elements.types.nameToHumanName', () => {
    it('should return "Business object" on "businessObject"', () => {
      Elements.types.nameToHumanName('businessObject').should.equal('Business Object');
    });
  });
}
