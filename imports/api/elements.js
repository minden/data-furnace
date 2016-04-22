import { Mongo } from 'meteor/mongo';

export const ElementsCollection = new Meteor.Collection('elements');

export const ElementTypes = [
  {humanName: 'Reference Object', name: 'referenceObject'},
  {humanName: 'Hierarchy', name: 'hierarchy'},
];

export const addElement = function(parentId, typeName) {
  var elementId = ElementsCollection.insert({parentId: parentId, typeName: typeName})
  ElementsCollection.update({_id: parentId}, {$addToSet: {childrenIds: elementId}});
}
