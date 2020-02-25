import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import AppContainer from 'src/containers/App';
import { PropsRoute } from 'src/components/PropsRoute';
import AnalysisContainer from 'src/containers/Analysis';
import SymptomsContainer from 'src/containers/Symptoms';

const AppRoutes = (props) => (
  <AppContainer {...props}>
    <Switch>
      <PropsRoute exact path="/" component={SymptomsContainer} {...props} />
      <PropsRoute path="/analysis" component={AnalysisContainer} {...props} />
      <Redirect to="/" />
    </Switch>
  </AppContainer>
);

export default AppRoutes;
