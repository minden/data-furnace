import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Elements from '../elements/elements.js';

const Reports = { elements: {}, measures: {} };

Reports.collection = new Meteor.Collection('Reports');

if (Meteor.isServer) {
  Meteor.publish('reports', () => {
    return Reports.collection.find();
  });
}

Reports.add = () => {
  return Reports.collection.insert({ name: 'Report', elements: [], measures: [] });
};

Reports.remove = (reportId) => {
  Reports.collection.remove(reportId);
};

Reports.addToTable = (reportId, type, id) => {
  if (type === 'measure') {
    Reports.measures.add(reportId, id);
  } else if (type === 'element') {
    Reports.elements.add(reportId, id, Elements.collection.findOne(id).characteristics);
  }
};

Meteor.methods({
  'Reports.toggleCharacteristic': (reportId, elementId, characteristicId, isPresent) => {
    check(reportId, String);
    check(elementId, String);
    check(characteristicId, String);
    check(isPresent, Boolean);

    if (isPresent) {
      Reports.collection.update(
        { _id: reportId, 'elements._id': elementId },
        { $pull: { 'elements.$.characteristicIds': characteristicId } }
      );
    } else {
      Reports.collection.update(
        { _id: reportId, 'elements._id': elementId },
        { $push: { 'elements.$.characteristicIds': characteristicId } }
      );
    }
  },
});

Reports.elements.add = (reportId, elementId, characteristics) => {
  const characteristicIds = characteristics.map((characteristic) => characteristic._id);
  Reports.collection.update(
    reportId,
    { $addToSet: { elements: { _id: elementId, characteristicIds } } }
  );
};

Reports.elements.swap = (reportId, elementId1, elementId2) => {
  const elements = Reports.collection.findOne(reportId).elements;
  const indexElement1 = elements.findIndex((element) => element._id === elementId1);
  const indexElement2 = elements.findIndex((element) => element._id === elementId2);
  const temp = elements[indexElement1];
  elements[indexElement1] = elements[indexElement2];
  elements[indexElement2] = temp;
  Reports.collection.update(reportId, { $set: { elements } });
};

Reports.measures.add = (reportId, measureId) => {
  Reports.collection.update(
    reportId,
    { $addToSet: { measures: { _id: measureId } } }
  );
};

export default Reports;
