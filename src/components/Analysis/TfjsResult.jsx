import React from 'react';
import PropTypes from 'prop-types';

import logo from 'app-static/images/tf.png';
import Result from './Result';

const TfjsResult = ({ translate, prediction, ...props }) => (
  <Result
    {...props}
    logo={logo}
    name={translate('tfjs.name')}
    meta={translate('tfjs.meta')}
    description={translate(`tfjs.description.${prediction}`)}
  />
);

TfjsResult.propTypes = {
  translate: PropTypes.func.isRequired,
  prediction: PropTypes.oneOf([
    'disease',
    'no-disease',
  ]).isRequired,
};

export default TfjsResult;
