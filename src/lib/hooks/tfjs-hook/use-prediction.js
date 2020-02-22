import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import * as tf from '@tensorflow/tfjs';
import useModel from './use-model';

const modelJsonFile = '';

export default (modelJson = modelJsonFile, data, options = {}) => {
  const [predictions, setPredictions] = useState(null);
  const model = useModel(modelJson, options);

  useAsyncEffect(
    async (isMounted) => {
      if (!model) return null;
      if (!data) return null;
      if (!isMounted()) return;

      const modelPredictions = await model.predict(
        tf.tensor(data, [1, data.length]),
      );
      if (!isMounted()) return;
      setPredictions(modelPredictions);
    },
    [model, data, predictions],
  );

  return {
    model,
    predictions,
  };
};
