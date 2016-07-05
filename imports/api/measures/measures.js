import { Meteor } from 'meteor/meteor';
import Expressions from './measures-expressions.js';

const Measures = {};

Measures.Expressions = Expressions;

Measures.collection = new Meteor.Collection('Measures');

if (Meteor.isServer) {
  Meteor.publish('measures', () => {
    return Measures.collection.find();
  });
}

Measures.add = () => {
  return Measures.collection.insert({
    name: 'unnamend',
    expressions: [],
  });
};

Measures.getName = (measureId) => {
  return Measures.collection.findOne(measureId).name;
};

Measures.setName = (measureId, name) => {
  Measures.collection.update(measureId, { $set: { name } });
};

export default Measures;
