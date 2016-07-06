import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Elements from '../elements/elements.js';

const Reports = { elements: {}, measures: {}, filters: {} };

Reports.collection = new Meteor.Collection('Reports');

if (Meteor.isServer) {
  Meteor.publish('reports', () => {
    return Reports.collection.find();
  });
}

Reports.add = () => {
  return Reports.collection.insert({ name: 'Report', elements: [], measures: [], filters: [] });
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
        { $pull: { 'elements.$.favCharacteristicIds': characteristicId } }
      );
    } else {
      Reports.collection.update(
        { _id: reportId, 'elements._id': elementId },
        { $push: { 'elements.$.favCharacteristicIds': characteristicId } }
      );
    }
  },
});

Reports.elements.add = (reportId, elementId, characteristics) => {
  const favCharacteristicIds = characteristics.map((characteristic) => characteristic._id);
  Reports.collection.update(
    reportId,
    { $addToSet: { elements: { _id: elementId, favCharacteristicIds } } }
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

Reports.filters.add = (reportId, type, _id) => {
  const update = { $addToSet: { filters: { _id, type } } };

  if (type === 'element') {
    update.$addToSet.filters.favCharacteristicIds = [];
  }

  Reports.collection.update(
    reportId,
    update
  );
};

Reports.filters.remove = (reportId, _id) => {
  Reports.collection.update(
    reportId,
    { $pull: { filters: { _id } } }
  );
};

Meteor.methods({
  'Reports.filters.toggleCharacteristic': (reportId, filterId, characteristicId, isPresent) => {
    check(reportId, String);
    check(filterId, String);
    check(characteristicId, String);
    check(isPresent, Boolean);

    if (isPresent) {
      Reports.collection.update(
        { _id: reportId, 'filters._id': filterId },
        { $pull: { 'filters.$.favCharacteristicIds': characteristicId } }
      );
    } else {
      Reports.collection.update(
        { _id: reportId, 'filters._id': filterId },
        { $push: { 'filters.$.favCharacteristicIds': characteristicId } }
      );
    }
  },
});

export default Reports;
