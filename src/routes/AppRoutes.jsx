import React from 'react';
import { Switch } from 'react-router-dom';

import { PropsRoute as Route } from 'app/components/Route';
import AnalysisContainer from 'app/containers/Analysis';
import SymptomsContainer from 'app/containers/Symptoms';

const AppRoutes = (props) => (
  <Switch>
    <Route exact path="/" title="symptoms" component={SymptomsContainer} {...props} />
    <Route path="/analysis" title="analysis" component={AnalysisContainer} {...props} />
  </Switch>
);

export default AppRoutes;