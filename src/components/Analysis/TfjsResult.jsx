import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import logo from 'app-static/images/tf.png';
import Result from './Result';

const TfjsResult = ({ prediction, ...props }) => {
  const { t } = useTranslation('analysis');

  return (
    <Result
      {...props}
      logo={logo}
      name={t('tfjs.name')}
      meta={t('tfjs.meta')}
      description={t(`tfjs.description.${prediction}`)}
    />
  );
};

TfjsResult.propTypes = {
  prediction: PropTypes.oneOf([
    'disease',
    'no-disease',
  ]).isRequired,
};

export default TfjsResult;
