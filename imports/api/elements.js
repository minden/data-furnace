import { Meteor } from 'meteor/meteor';

const Elements = {};

Elements.collection = new Meteor.Collection('Elements');

Elements.types = [
  { humanName: 'Reference object', name: 'referenceObject' },
  { humanName: 'Hierarchy', name: 'hierarchy' },
];

Elements.add = function add(parentId, typeName) {
  const elementId = Elements.collection.insert(
    { parentId: parentId, typeName: typeName });
  Elements.collection.update(
    { _id: parentId }, { $addToSet: { childrenIds: elementId } }
  );
  return elementId;
};

Elements.types.nameToHumanName = (name) => {
  const type = Elements.types.find(function(type) {
    if (type.name === name) {
      return true;
    }
  });
  return type.humanName;
};

export default Elements;
