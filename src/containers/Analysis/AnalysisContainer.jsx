import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValueLoadable } from 'recoil';
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
import Loading from 'app/components/Loading';
import { diseaseAnalysisHistory } from 'app/state';

const AnalysisContainer = ({ onSelect, analysis }) => {
  const analysisHistoryLoadable = useRecoilValueLoadable(diseaseAnalysisHistory);

  if (analysisHistoryLoadable.state === 'loading') {
    return <Loading />;
  }

  if (analysisHistoryLoadable.state === 'hasError') {
    return null;
  }

  const { predictions: analysisPredictions } = analysis;
  const analysisHistory = analysisHistoryLoadable.contents;

  return (
    <Segment padded>
      <Grid columns={2} stackable>
        <Grid.Column width={10}>
          <List selection divided relaxed verticalAlign="middle">
            {analysisHistory.map(({ symptoms, predictions }, i) => (
              <List.Item
                key={`analysis-history-${i + 1}`}
                onClick={() => onSelect({ symptoms, predictions })}
              >
                <List.Content>
                  <List.Header as="a">{symptoms.fullName}</List.Header>
                  <List.Description as="a">
                    {moment(symptoms.date).format('DD MMMM YYYY h:mm a')}
                  </List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Grid.Column>
        <Grid.Column width={6}>
          {analysisPredictions && (
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
          )}
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
  onSelect: PropTypes.func.isRequired,
  analysis: PropTypes.shape({
    predictions: PropTypes.shape(),
  }).isRequired,
};

export default AnalysisContainer;
