import Measures from './measures.js';
import { Random } from 'meteor/random';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
const Expressions = {};

Expressions.types = [
  {
    name: 'attribute',
    uIName: 'Attribute',
    icon: 'fa fa-tag',
    possibleFollowers: ['operator'],
  },
  {
    name: 'measure',
    uIName: 'Measure',
    icon: 'fa fa-balance-scale',
    possibleFollowers: ['operator'],
  },
  {
    name: 'operator',
    uIName: 'Operator',
    icon: 'fa fa-calculator',
    characteristics: [{ name: '+' }, { name: '-' }, { name: '*' }, { name: '/' }],
    possibleFollowers: ['attribute', 'measure', 'func', 'openingBracket', 'closingBracket'],
  },
  {
    name: 'func',
    uIName: 'Function',
    icon: 'fa fa-code',
    characteristics: [{ name: 'sum' }, { name: 'count' }],
    possibleFollowers: ['operator'],
  },
  {
    name: 'openingBracket',
    uIName: '(',
    icon: 'fa',
    possibleFollowers: ['operator'],
  },
  {
    name: 'closingBracket',
    uIName: ')',
    icon: 'fa',
    possibleFollowers: ['operator'],
  },
];

Expressions.types.get = (typeName) => {
  return Expressions.types.find((type) => type.name === typeName);
};

Expressions.addBehindExpression = (measureId, typeName, behindExpressionId) => {
  const expressionId = Random.id();
  const newExpression = { _id: expressionId, typeName, name: '' };

  const expressions = Measures.collection.findOne(measureId).expressions;
  const behindExpressionIndex = expressions.findIndex(
    (expression) => expression._id === behindExpressionId
  );
  expressions.splice(behindExpressionIndex + 1, 0, newExpression);

  Measures.collection.update(measureId, { $set: { expressions } });
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
