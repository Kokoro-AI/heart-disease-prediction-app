import React from 'react';
import PropTypes from 'prop-types';

import logo from 'src-static/images/pl.png';
import Result from './Result';

const PlResult = ({ translate, prediction, ...props }) => (
  <Result
    {...props}
    logo={logo}
    name={translate('pl.name')}
    meta={translate('pl.meta')}
    description={translate(`pl.description.${prediction}`)}
  />
);

PlResult.propTypes = {
  translate: PropTypes.func.isRequired,
  prediction: PropTypes.oneOf([
    'disease',
    'no-disease',
  ]).isRequired,
};

export default PlResult;
