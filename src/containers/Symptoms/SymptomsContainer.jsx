import React from 'react';
import { useSelector } from 'react-redux';
import { hasSubmitSucceeded } from 'redux-form';
import { Redirect } from 'react-router';
import { Container, Header, Segment } from 'semantic-ui-react';

import { useTauProlog } from 'src/lib/hooks/tau-prolog-hook';
import SymptomsFormContainer from 'src/containers/Symptoms/SymptomsFormContainer';

const analyze = (data) => {
  const { pl } = useTauProlog();
  console.log('analyzing data...', data, pl);
  pl.query('disease(p1)');
};

const SymptomsContainer = ({ translate }) => {
  const success = useSelector((state) => hasSubmitSucceeded('symptoms')(state));

  if (success) {
    return <Redirect to="/results" />;
  }

  return (
    <Container style={{ paddingTop: 100 }}>
      <Segment>
        <Header as="h2">
          {translate('symptoms:form.title')}
          <Header.Subheader>
            {translate('symptoms:form.subtitle')}
          </Header.Subheader>
        </Header>
        <SymptomsFormContainer
          translate={(name, ...args) => translate(`symptoms:${name}`, ...args)}
          onSubmit={analyze}
        />
      </Segment>
    </Container>
  );
};

export default SymptomsContainer;
