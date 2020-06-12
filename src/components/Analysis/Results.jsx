import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

export const Results = ({ children, ...props }) => (
  <Card.Group {...props}>{children}</Card.Group>
);

Results.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Results;
