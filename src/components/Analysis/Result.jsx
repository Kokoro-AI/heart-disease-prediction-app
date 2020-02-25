import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Image,
} from 'semantic-ui-react';

const Result = (props) => {
  const {
    logo,
    name,
    meta,
    description,
    ...rest
  } = props;

  return (
    <Card {...rest}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={logo}
        />
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{meta}</Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

Result.propTypes = {
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  meta: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default React.memo(Result);
