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

Measures.setName = (elementId, name) => {
  Measures.collection.update(elementId, { $set: { name } });
};

export default Measures;
