import React from 'react';
import { Redirect } from 'react-router';
import { hasSubmitSucceeded } from 'redux-form';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Container, Header, Segment } from 'semantic-ui-react';

import { storePredictions } from 'src/actions/disease';
import { useHeartAnalyzer } from 'src/lib/hooks/heart-analyze-hook';
import SymptomsFormContainer from 'src/containers/Symptoms/SymptomsFormContainer';

const successSelector = (state) => hasSubmitSucceeded('symptoms')(state);

const SymptomsContainer = ({ translate }) => {
  const success = useSelector(successSelector, shallowEqual);
  const dispatch = useDispatch();
  const { analyze } = useHeartAnalyzer();

  const onSubmit = (values) => {
    const analysis = analyze(values);
    dispatch(storePredictions({
      symptoms: values,
      predictions: analysis,
    }));
  };

  if (success) {
    return <Redirect to="/analysis" />;
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
          onSubmit={onSubmit}
        />
      </Segment>
    </Container>
  );
};

export default SymptomsContainer;
