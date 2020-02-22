import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import * as tf from '@tensorflow/tfjs';
import { MODEL_ARTIFACTS_URL } from 'src/config/app';
import useModel from './use-model';

export default (data, options = {}) => {
  const [predictions, setPredictions] = useState(null);
  const model = useModel(MODEL_ARTIFACTS_URL, options);

  useAsyncEffect(
    async (isMounted) => {
      if (!model) return null;
      if (!data) return null;
      if (predictions) return null;

      const modelPredictions = await model.predict(
        tf.tensor([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 13]),
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
