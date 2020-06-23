import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import logo from 'app-static/images/pl.png';
import Result from './Result';

const PlResult = ({ prediction, ...props }) => {
  const { t } = useTranslation('analysis');

  return (
    <Result
      {...props}
      logo={logo}
      name={t('pl.name')}
      meta={t('pl.meta')}
      description={t(`pl.description.${prediction}`)}
    />
  );
};

PlResult.propTypes = {
  prediction: PropTypes.oneOf([
    'disease',
    'no-disease',
  ]).isRequired,
};

export default PlResult;
