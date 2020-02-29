import _ from 'underscore';
import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import moment from 'moment-timezone';
import {
  Grid,
  Segment,
  Responsive,
  List,
  Divider,
  Icon,
} from 'semantic-ui-react';

import Navbar from 'src/components/Layout/Navbar';
import { Results, TfjsResult, PlResult } from 'src/components/Analysis';
import { Redirect } from 'react-router';

const analysisHistorySelector = (state) => state.disease.analysisHistory;

const SymptomsContainer = ({ translate }) => {
  const analysisHistory = useSelector(analysisHistorySelector, shallowEqual);

  if (_.isEmpty(analysisHistory)) {
    return <Redirect to="/" />;
  }

  const [analysis, setAnalysis] = useState(_.first(analysisHistory));
  const [smallMenu, setSmallMenu] = useState(false);
  const [previousWidth, setPreviousWidth] = useState(null);

  const { predictions: analysisPredictions } = analysis;

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
        logo={null}
        smallMenu={smallMenu}
        showTitle
        showProfilePath={false}
        onChangeSizeButtonClick={() => setSmallMenu(!smallMenu)}
        translate={(name, ...args) => translate(`analysis:${name}`, ...args)}
      />
      <div className="container-content">
        <Segment padded>
          <Grid columns={2}>
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
                  translate={(name, ...args) => translate(`analysis:${name}`, ...args)}
                  prediction={analysisPredictions.mlPrediction}
                />
                <PlResult
                  fluid
                  translate={(name, ...args) => translate(`analysis:${name}`, ...args)}
                  prediction={analysisPredictions.plPrediction}
                />
              </Results>
            </Grid.Column>
          </Grid>
          <Divider vertical><Icon name="angle double right" color="blue" /></Divider>
        </Segment>
      </div>
    </>
  );
};

export default SymptomsContainer;