import { Meteor } from 'meteor/meteor';

const Reports = { columns: {}, rows: {} };

Reports.collection = new Meteor.Collection('Reports');

Reports.add = () => {
  return Reports.collection.insert({ columns: [], rows: [] });
};

Reports.addToTable = (reportId, type, id) => {
  if (type === 'measure') {
    Reports.rows.add(reportId, id);
  } else if (type === 'element') {
    Reports.columns.add(reportId, id);
  }
};

Reports.columns.add = (reportId, elementId) => {
  Reports.collection.update(
    reportId,
    { $push: { columns: { elementId } } }
  );
};

Reports.rows.add = (reportId, measureId) => {
  Reports.collection.update(
    reportId,
    { $push: { rows: { measureId } } }
  );
};

export default Reports;
