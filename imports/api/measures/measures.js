import { Meteor } from 'meteor/meteor';

const Measures = {};

Measures.collection = new Meteor.Collection('Measures');

Measures.add = () => {
  Measures.collection.insert({
    name: 'unnamend',
  });
};

export default Measures;
