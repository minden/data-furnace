import { Meteor } from 'meteor/meteor';

const Elements = {};

Elements.collection = new Meteor.Collection('Elements');

Elements.types = [
  {humanName: 'Reference Object', name: 'referenceObject'},
  {humanName: 'Hierarchy', name: 'hierarchy'},
];

Elements.add = function add(parentId, typeName) {
  let elementId = Elements.collection.insert(
    {parentId: parentId, typeName: typeName});
  Elements.collection.update(
    {_id: parentId}, {$addToSet: {childrenIds: elementId}});
};

export default Elements;
