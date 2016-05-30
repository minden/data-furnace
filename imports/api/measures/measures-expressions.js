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
    possibleFollowers: ['operator'],
  },
];

Expressions.operators = {};
Expressions.operators.types = [
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

Expressions.removeLast = (measureId) => {
  Measures.collection.update(
    measureId,
    { $pop: { expressions: 1 } }
  );
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

  'Measures.Expressions.setMeasure': (measureId, expressionId, measureIdToSet) => {
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
