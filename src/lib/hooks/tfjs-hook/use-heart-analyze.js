import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { MODEL_ARTIFACTS_URL } from 'src/config/app';
import useModel from './use-model';

export default (data, options = {}) => {
  const [predictions, setPredictions] = useState(null);
  const model = useModel(MODEL_ARTIFACTS_URL, options);

  useAsyncEffect(
    async (isMounted) => {
      if (!model) return null;
      if (!data) return null;
      if (!isMounted()) return;

      const modelPredictions = await model.predict({ feature: data });
      setPredictions(modelPredictions);
    },
    [model, data],
  );

  return {
    model,
    predictions,
  };
};