import Measures from './measures.js';
import { Random } from 'meteor/random';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
const Expressions = {};

Expressions.types = [
  { name: 'attribute', icon: 'fa fa-tag' },
  { name: 'measure', icon: 'fa fa-balance-scale' },
  { name: 'operator', icon: 'fa fa-calculator' },
  { name: 'func', icon: 'fa fa-code' },
];

Expressions.operators = {};
Expressions.operators.types = [
  { name: '+' }, { name: '-' }, { name: '*' }, { name: '/' },
];

Expressions.types.get = (typeName) => {
  return Expressions.types.find((type) => type.name === typeName);
};

Expressions.add = (measureId, typeName) => {
  Measures.collection.update(
    measureId,
    { $push: { expressions: { _id: Random.id(), typeName, name: '' } } }
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
