import React from 'react';
import { Switch } from 'react-router-dom';

import { PropsRoute as Route } from 'app/components/Route';
import Analysis from 'app/pages/Analysis';
import Landing from 'app/pages/Landing';

const AppRoutes = (props) => (
  <Switch>
    <Route exact path="/" title="home" component={Landing} {...props} />
    <Route path="/analysis" title="analysis" component={Analysis} {...props} />
  </Switch>
);

export default AppRoutes;
