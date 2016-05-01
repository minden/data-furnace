import { Meteor } from 'meteor/meteor';

const Elements = {};

Meteor.Elements = Elements;

Elements.collection = new Meteor.Collection('Elements');

Elements.types = [
  { humanName: 'Reference object', name: 'referenceObject', possibleChildren: [] },
  { humanName: 'Hierarchy', name: 'hierarchy', possibleChildren: ['hiearchy', 'referenceObject'] },
  { humanName: 'Aggregate', name: 'aggregate', possibleChildren: [] },
  { humanName: 'Dimension', name: 'dimension', possibleChildren: [] },
  { humanName: 'Dimensions group', name: 'dimensionGroup', possibleChildren: [] },
];

Elements.add = function add(parentId, typeName) {
  const elementId = Elements.collection.insert(
    { parentId, typeName, childIds: [], name: '' });
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
  Elements.collection.update(elementId, { $set: {name }});
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
