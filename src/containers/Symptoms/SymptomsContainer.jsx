import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header, Segment, Responsive } from 'semantic-ui-react';

import SymptomsForm from 'app/components/Symptoms/Form';
import Navbar from 'app/components/Layout/Navbar';
import { useHeartAnalyzer } from 'app/hooks/heart-analyze-hook';
import { diseaseAnalysisHistory } from 'app/state';

import kokoroLogo from 'app-static/images/kokoro.png';

const SymptomsContainer = () => {
  const [smallMenu, setSmallMenu] = useState(false);
  const [previousWidth, setPreviousWidth] = useState(null);

  const history = useHistory();
  const { t } = useTranslation('symptoms');
  const { analyze } = useHeartAnalyzer();
  const [analysisHistory, setAnalysisHistory] = useRecoilState(diseaseAnalysisHistory);

  const navbarOptions = [{
    icon: 'list ol',
    to: '/analysis',
    name: 'analysis',
    text: t('options.analysis'),
  }];

  const onSubmit = (values, formikApi) => {
    setAnalysisHistory([...analysisHistory, {
      symptoms: values,
      predictions: analyze(values),
    }]);
    formikApi.setSubmitting(false);
    history.push('/analysis');
  };

  return (
    <>
      <Responsive
        fireOnMount
        onUpdate={(e, { width }) => {
          if (width !== previousWidth) {
            setPreviousWidth(width);
            setSmallMenu(width < 976);
          }
        }}
      />
      <Navbar
        user={{}}
        logo={kokoroLogo}
        smallMenu={smallMenu}
        showTitle
        showOptionText
        showProfilePath={false}
        translate={t}
        options={navbarOptions}
        onChangeSizeButtonClick={() => setSmallMenu(!smallMenu)}
      />
      <div className="container-content">
        <Segment>
          <Header as="h2">
            {t('form.title')}
            <Header.Subheader>
              {t('form.subtitle')}
            </Header.Subheader>
          </Header>
          <SymptomsForm onSubmit={onSubmit} />
        </Segment>
      </div>
    </>
  );
};

SymptomsContainer.propTypes = {
};

export default SymptomsContainer;
