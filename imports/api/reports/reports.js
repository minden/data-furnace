import { Meteor } from 'meteor/meteor';
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
