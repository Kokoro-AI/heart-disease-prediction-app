import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import { Container, Header, Segment } from 'semantic-ui-react';

import SymptomsForm from 'app/components/Symptoms/Form';
import { useHeartAnalyzer } from 'app/hooks/heart-analyze-hook';
import { diseaseAnalysisHistory } from 'app/state';

const SymptomsContainer = ({ translate }) => {
  const history = useHistory();
  const { analyze } = useHeartAnalyzer();
  const [analysisHistory, setAnalysisHistory] = useRecoilState(diseaseAnalysisHistory);

  const onSubmit = (values, formikApi) => {
    setAnalysisHistory([...analysisHistory, {
      symptoms: values,
      predictions: analyze(values),
    }]);
    formikApi.setSubmitting(false);
    history.push('/analysis');
  };

  return (
    <Container style={{ paddingTop: 100 }}>
      <Segment>
        <Header as="h2">
          {translate('symptoms:form.title')}
          <Header.Subheader>
            {translate('symptoms:form.subtitle')}
          </Header.Subheader>
        </Header>
        <SymptomsForm
          translate={(name, ...args) => translate(`symptoms:${name}`, ...args)}
          onSubmit={onSubmit}
        />
      </Segment>
    </Container>
  );
};

SymptomsContainer.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default SymptomsContainer;
