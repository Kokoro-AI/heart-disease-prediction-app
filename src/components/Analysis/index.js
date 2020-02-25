import React from 'react';
import { Card } from 'semantic-ui-react';

import ResultComponent from './Result';
import TfjsResultComponent from './TfjsResult';
import PlResultComponent from './PlResult';

export const Result = ResultComponent;
export const TfjsResult = TfjsResultComponent;
export const PlResult = PlResultComponent;

export const Results = ({ children, ...props }) => (
  <Card.Group {...props}>{children}</Card.Group>
);

export default {
  Result,
  TfjsResult,
  PlResult,
};
