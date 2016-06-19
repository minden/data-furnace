import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Elements from '../elements/elements.js';

const Reports = { elements: {}, measures: {} };

Reports.collection = new Meteor.Collection('Reports');

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

    console.log(reportId, elementId, characteristicId, isPresent);

    if (isPresent) {
      Reports.collection.update(
        { _id: reportId, 'elements.elementId': elementId },
        { $pull: { 'elements.$.characteristics': { _id: characteristicId } } }
      );
    } else {
      const characteristic = Elements.collection.
        findOne(elementId).characteristics.
        find((origCharacteristic) => origCharacteristic._id === characteristicId);
      console.log(characteristic);
      Reports.collection.update(
        { _id: reportId, 'elements.elementId': elementId },
        { $push: { 'elements.$.characteristics': characteristic } }
      );
    }
  },
});

Reports.elements.add = (reportId, elementId, characteristics) => {
  Reports.collection.update(
    reportId,
    { $addToSet: { elements: { elementId, characteristics } } }
  );
};

Reports.measures.add = (reportId, measureId) => {
  Reports.collection.update(
    reportId,
    { $addToSet: { measures: { measureId } } }
  );
};

export default Reports;
