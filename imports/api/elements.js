import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { check } from 'meteor/check';

const Elements = {};

Meteor.Elements = Elements;

Elements.collection = new Meteor.Collection('Elements');

Elements.types = [
  { humanName: 'Reference object', name: 'referenceObject', possibleChildren: [] },
  { humanName: 'Hierarchy', name: 'hierarchy', possibleChildren: ['hiearchy', 'referenceObject'] },
  { humanName: 'Dimension', name: 'dimension', possibleChildren: ['referenceObject', 'hierarchy'] },
];

Elements.add = function add(parentId, typeName) {
  const elementId = Elements.collection.insert({
    attributes: [],
    childIds: [],
    description: '',
    name: 'unnamed',
    parentId,
    typeName,
  });

  Elements.collection.update(
    { _id: parentId }, { $addToSet: { childIds: elementId } }
  );

  return elementId;
};

Elements.remove = function remove(elementId, parentId) {
  Elements.collection.update({ _id: parentId }, { $pull: { childIds: elementId } });
  Elements.collection.remove(elementId);
};

Elements.setName = (elementId, name) => {
  Elements.collection.update(elementId, { $set: { name } });
};

Elements.setDescription = (elementId, description) => {
  Elements.collection.update(elementId, { $set: { description } });
};

Elements.addAttribute = (elementId) => {
  Elements.collection.update(elementId, { $push: { attributes: { _id: Random.id(), name: '', type: '' } } });
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

Elements.types.nameToHumanName = (name) => {
  const returnType = Elements.types.find((type) => {
    if (type.name === name) {
      return true;
    }
    return false;
  });
  return returnType.humanName;
};

export default Elements;
