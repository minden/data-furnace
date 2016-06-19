import { Meteor } from 'meteor/meteor';
import Elements from '../elements/elements.js';

const Reports = { columns: {}, rows: {} };

Reports.collection = new Meteor.Collection('Reports');

Reports.add = () => {
  return Reports.collection.insert({ name: 'Report', columns: [], rows: [] });
};

Reports.remove = (reportId) => {
  Reports.collection.remove(reportId);
};

Reports.addToTable = (reportId, type, id) => {
  if (type === 'measure') {
    Reports.rows.add(reportId, id);
  } else if (type === 'element') {
    Reports.columns.add(reportId, id, Elements.collection.findOne(id).characteristics);
  }
};

Reports.columns.add = (reportId, elementId, characteristics) => {
  Reports.collection.update(
    reportId,
    { $addToSet: { columns: { elementId, characteristics } } }
  );
};

Reports.rows.add = (reportId, measureId) => {
  Reports.collection.update(
    reportId,
    { $addToSet: { rows: { measureId } } }
  );
};

export default Reports;
