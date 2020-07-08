import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { Header, Segment } from 'semantic-ui-react';

import SymptomsForm from 'app/components/Symptoms/Form';
import { useHeartAnalyzer } from 'app/hooks/heart-analyze-hook';
import { diseaseAnalysisHistory } from 'app/state';

const SymptomsContainer = ({ initialValues }) => {
  const { t } = useTranslation('symptoms');
  const { analyze } = useHeartAnalyzer();
  const [analysisHistory, setAnalysisHistory] = useRecoilState(diseaseAnalysisHistory);

  const onSubmit = (values, formikApi) => {
    setAnalysisHistory([...analysisHistory, {
      symptoms: values,
      predictions: analyze(values),
    }]);
    formikApi.setSubmitting(false);
  };

  return (
    <Segment>
      <Header as="h2">
        {t('form.title')}
        <Header.Subheader>
          {t('form.subtitle')}
        </Header.Subheader>
      </Header>
      <SymptomsForm
        onSubmit={onSubmit}
        initialValues={initialValues}
      />
    </Segment>
  );
};

SymptomsContainer.defaultProps = {
  initialValues: undefined,
};

SymptomsContainer.propTypes = {
  initialValues: PropTypes.shape({}),
};

export default SymptomsContainer;
