import Elements from './elements.js';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

const attributes = {};

attributes.add = (elementId) => {
  Elements.collection.update(
    elementId,
    { $push: { attributes: { _id: Random.id(), name: '', type: '' } } }
  );
};

Meteor.methods({
  'elements.setAttributeName': (elementId, attributeId, name) => {
    check(elementId, String);
    check(attributeId, String);
    check(name, String);
    Elements.collection.update(
      { _id: elementId, 'attributes._id': attributeId },
      { $set: { 'attributes.$.name': name } }
    );
  },

  'elements.setAttributeType': (elementId, attributeId, type) => {
    check(elementId, String);
    check(attributeId, String);
    check(type, String);
    Elements.collection.update(
      { _id: elementId, 'attributes._id': attributeId },
      { $set: { 'attributes.$.type': type } }
    );
  },
});

export default attributes;
