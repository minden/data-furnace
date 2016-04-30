import { Meteor } from 'meteor/meteor';

const Elements = {};

Meteor.Elements = Elements;

Elements.collection = new Meteor.Collection('Elements');

Elements.types = [
  { humanName: 'Reference object', name: 'referenceObject' },
  { humanName: 'Hierarchy', name: 'hierarchy' },
];

Elements.add = function add(parentId, typeName) {
  const elementId = Elements.collection.insert(
    { parentId, typeName, childIds: [] });
  Elements.collection.update(
    { _id: parentId }, { $addToSet: { childIds: elementId } }
  );
  return elementId;
};

Elements.remove = function remove(elementId, parentId) {
  Elements.collection.update({ _id: parentId }, { $pull: { childIds: elementId } });
  Elements.collection.remove(elementId);
};


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
