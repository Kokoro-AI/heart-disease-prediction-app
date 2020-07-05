import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import moment from 'moment-timezone';
import {
  Grid,
  Segment,
  Responsive,
  List,
  Divider,
  Icon,
} from 'semantic-ui-react';

import { Results, TfjsResult, PlResult } from 'app/components/Analysis';
import { diseaseAnalysisHistory } from 'app/state';

const AnalysisContainer = ({ onClick, analysis }) => {
  const analysisHistory = useRecoilValue(diseaseAnalysisHistory);

  if (_.isEmpty(analysisHistory)) {
    return null;
  }

  const { predictions: analysisPredictions } = analysis;

  return (
    <Segment padded>
      <Grid columns={2} stackable>
        <Grid.Column width={10}>
          <List selection divided relaxed verticalAlign="middle">
            {analysisHistory.map(({ symptoms, predictions }, i) => (
              <List.Item
                key={`analysis-history-${i + 1}`}
                onClick={() => onClick({ symptoms, predictions })}
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
  );
};

AnalysisContainer.propTypes = {
  onClick: PropTypes.func.isRequired,
  analysis: PropTypes.shape({
    predictions: PropTypes.shape(),
  }).isRequired,
};

export default AnalysisContainer;
