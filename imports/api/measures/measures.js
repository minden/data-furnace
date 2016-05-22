import { Meteor } from 'meteor/meteor';

const Measures = {};

Measures.collection = new Meteor.Collection('Measures');

Measures.add = () => {
  Measures.collection.insert({
    name: 'unnamend',
  });
};

Measures.setName = (elementId, name) => {
  Measures.collection.update(elementId, { $set: { name } });
};

export default Measures;
