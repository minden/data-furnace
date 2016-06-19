import Elements from './elements.js';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

const characteristics = {};

characteristics.add = (elementId, value) => {
  Elements.collection.update(
    elementId,
    { $push: { characteristics: { _id: Random.id(), value } } }
  );
};

characteristics.remove = (elementId, characteristicsId) => {
  Elements.collection.update(
    elementId,
    { $pull: { characteristics: { _id: characteristicsId } } }
  );
};

characteristics.get = (elementId, characteristicsId) => {
  const element = Elements.collection.findOne(elementId);
  return element.characteristics.
    find((characteristic) => characteristic._id === characteristicsId);
};

Meteor.methods({
  'elements.characteristics.setValue': (elementId, characteristicId, value) => {
    check(elementId, String);
    check(characteristicId, String);
    check(value, String);

    Elements.collection.update(
      { _id: elementId, 'characteristics._id': characteristicId },
      { $set: { 'characteristics.$.value': value } }
    );
  },
});

export default characteristics;
