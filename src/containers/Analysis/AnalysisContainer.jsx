import _ from 'lodash';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';
import {
  Grid,
  Segment,
  Responsive,
  List,
  Divider,
  Icon,
} from 'semantic-ui-react';

import SymptomsForm from 'app/components/Symptoms/Form';
import Navbar from 'app/components/Layout/Navbar';
import { Results, TfjsResult, PlResult } from 'app/components/Analysis';
import { diseaseAnalysisHistory } from 'app/state';

import kokoroLogo from 'app-static/images/kokoro.png';

const AnalysisContainer = () => {
  const analysisHistory = useRecoilValue(diseaseAnalysisHistory);

  if (_.isEmpty(analysisHistory)) {
    return <Redirect to="/" />;
  }

  const [analysis, setAnalysis] = useState(_.first(analysisHistory));
  const [smallMenu, setSmallMenu] = useState(false);
  const [previousWidth, setPreviousWidth] = useState(null);
  const { t } = useTranslation('analysis');

  const { predictions: analysisPredictions } = analysis;

  const navbarOptions = [{
    icon: 'list ol',
    to: '/analysis',
    name: 'analysis',
    text: t('options.analysis'),
  }];

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
        active="analysis"
        options={navbarOptions}
        onChangeSizeButtonClick={() => setSmallMenu(!smallMenu)}
      />
      <div className="container-content">
        <Segment>
          <SymptomsForm
            initialValues={analysis.symptoms}
            readOnly
          />
        </Segment>
        <Segment padded>
          <Grid columns={2} stackable>
            <Grid.Column width={10}>
              <List selection divided relaxed verticalAlign="middle">
                {analysisHistory.map(({ symptoms, predictions }, i) => (
                  <List.Item
                    key={`analysis-history-${i + 1}`}
                    onClick={() => setAnalysis({ symptoms, predictions })}
                  >
                    <List.Content>
                      <List.Header as="a">{symptoms.fullName}</List.Header>
                      <List.Description as="a">
                        {moment(symptoms.date, 'DD/MM/YYYY').format('MMMM Do YYYY, h:mm:ss a')}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Grid.Column>
            <Grid.Column width={6}>
              <Results>
                <TfjsResult
                  fluid
                  prediction={analysisPredictions.mlPrediction}
                />
                <PlResult
                  fluid
                  prediction={analysisPredictions.plPrediction}
                />
              </Results>
            </Grid.Column>
          </Grid>
          <Responsive
            as={() => (
              <Divider vertical>
                <Icon name="angle double right" color="blue" />
              </Divider>
            )}
            minWidth={500}
          />
        </Segment>
      </div>
    </>
  );
};

export default AnalysisContainer;
