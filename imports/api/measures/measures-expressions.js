import Measures from './measures.js';
import { Random } from 'meteor/random';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
const Expressions = {};

Expressions.types = [
  {
    name: 'attribute',
    icon: 'fa fa-tag',
    possibleFollowers: ['operator'],
  },
  {
    name: 'measure',
    icon: 'fa fa-balance-scale',
    possibleFollowers: ['operator'],
  },
  {
    name: 'operator',
    icon: 'fa fa-calculator',
    characteristics: [{ name: '+' }, { name: '-' }, { name: '*' }, { name: '/' }],
    possibleFollowers: ['attribute', 'measure', 'func'],
  },
  {
    name: 'func',
    icon: 'fa fa-code',
    characteristics: [{ name: 'sum' }, { name: 'count' }],
    possibleFollowers: ['operator'],
  },
];

Expressions.types.get = (typeName) => {
  return Expressions.types.find((type) => type.name === typeName);
};

Expressions.add = (measureId, typeName) => {
  const expressionId = Random.id();

  Measures.collection.update(
    measureId,
    { $push: { expressions: { _id: expressionId, typeName, name: '' } } }
  );

  return expressionId;
};

Expressions.remove = (measureId, expressionId) => {
  Measures.collection.update(
    measureId,
    { $pull: { expressions: { _id: expressionId } } }
  );
};

Expressions.get = (measureId, expressionId) => {
  const measure = Measures.collection.findOne(measureId);
  return measure.expressions.find((expression) => expression._id === expressionId);
};

Expressions.getChildren = (measureId, parentId) => {
  const measure = Measures.collection.findOne(measureId);
  return measure.expressions.filter((expression) => expression.parentId === parentId);
};

Meteor.methods({
  'Measures.Expressions.setName': (measureId, expressionId, name) => {
    check(measureId, String);
    check(expressionId, String);
    check(name, String);
    Measures.collection.update(
      { _id: measureId, 'expressions._id': expressionId },
      { $set: { 'expressions.$.name': name } }
    );
  },

  'Measures.Expressions.setMeasureId': (measureId, expressionId, measureIdToSet) => {
    check(measureId, String);
    check(expressionId, String);
    check(measureIdToSet, String);
    Measures.collection.update(
      { _id: measureId, 'expressions._id': expressionId },
      { $set: { 'expressions.$.measureId': measureIdToSet } }
    );
  },
});

export default Expressions;
