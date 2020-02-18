import React from 'react';
import { Switch } from 'react-router-dom';

import AppContainer from 'src/containers/App';
import SymptomsContainer from 'src/containers/Symptoms';
import { PropsRoute } from 'src/components/PropsRoute';

const AppRoutes = (props) => (
  <AppContainer {...props}>
    <Switch>
      <PropsRoute path="/" component={SymptomsContainer} {...props} />
      <PropsRoute path="/analyzer" component={SymptomsContainer} {...props} />
    </Switch>
  </AppContainer>
);

export default AppRoutes;
