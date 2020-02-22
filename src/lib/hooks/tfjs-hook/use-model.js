import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import * as tf from '@tensorflow/tfjs';

export default (modelJson) => {
  const [model, setModel] = useState(null);
  useAsyncEffect(async (isMounted) => {
    if (model) return null;

    const layersModel = await tf.loadLayersModel(modelJson);

    if (!isMounted()) return;

    setModel(layersModel);
  }, [model]);
  return model;
};
