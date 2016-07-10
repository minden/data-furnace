import React from 'react';
import { Router, Route, browserHistory, Redirect } from 'react-router';

import StructureView from '../../ui/structure-view/structure-view.jsx';
import MeasureView from '../../ui/measure-view/measure-view.jsx';
import ReportView from '../../ui/report-view/report-view.jsx';

// route components
import App from '../../ui/app.jsx';

export const getRoutes = () => (
  <Router history={browserHistory}>
    <Redirect from="/" to="/structure-view" />
    <Route path="/" component={App}>
      <Route path="/structure-view" component={StructureView} />
      <Route path="/measure-view" component={MeasureView} />
      <Route path="/report-view" component={ReportView} />
    </Route>
  </Router>
);
