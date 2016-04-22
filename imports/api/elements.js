import { Meteor } from 'meteor/meteor';

export const ElementsCollection = new Meteor.Collection('elements');

export const ElementTypes = [
  {humanName: 'Reference Object', name: 'referenceObject'},
  {humanName: 'Hierarchy', name: 'hierarchy'},
];

export const addElement = function addElement(parentId, typeName) {
  let elementId = ElementsCollection.insert(
    {parentId: parentId, typeName: typeName});
  ElementsCollection.update(
    {_id: parentId}, {$addToSet: {childrenIds: elementId}});
};
