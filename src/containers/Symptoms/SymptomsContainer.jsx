import React from 'react';
import { useSelector } from 'react-redux';
import { hasSubmitSucceeded } from 'redux-form';
import { Redirect } from 'react-router';
import { Container, Header, Segment } from 'semantic-ui-react';

import { useHeartAnalyzer } from 'src/lib/hooks/heart-analyze-hook';
import SymptomsFormContainer from 'src/containers/Symptoms/SymptomsFormContainer';

const SymptomsContainer = ({ translate }) => {
  const success = useSelector((state) => hasSubmitSucceeded('symptoms')(state));
  const { analyze } = useHeartAnalyzer({});

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
