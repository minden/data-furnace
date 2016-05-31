import { Meteor } from 'meteor/meteor';
import Expressions from './measures-expressions.js';

const Measures = {};

Measures.Expressions = Expressions;

Measures.collection = new Meteor.Collection('Measures');

Measures.add = () => {
  return Measures.collection.insert({
    name: 'unnamend',
    expressions: [],
  });
};

Measures.setName = (measureId, name) => {
  Measures.collection.update(measureId, { $set: { name } });
};

export default Measures;
