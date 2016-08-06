import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import DimensionView from '../../ui/dimension-view/dimension-view.jsx';
import MeasureView from '../../ui/measure-view/measure-view.jsx';
import ReportView from '../../ui/report-view/report-view.jsx';
import LandingPage from '../../ui/landing-view/landing-page.jsx';

// route components
import App from '../../ui/app.jsx';

export const getRoutes = () => (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={LandingPage} />
      <Route path="/dimension-view" component={DimensionView} />
      <Route path="/measure-view" component={MeasureView} />
      <Route path="/report-view" component={ReportView} />
    </Route>
  </Router>
);
