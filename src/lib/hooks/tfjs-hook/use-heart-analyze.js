import * as tf from '@tensorflow/tfjs';
import { MODEL_ARTIFACTS_URL, COLUMNS } from 'src/config/app';
import useModel from './use-model';

export default (options = {}) => {
  const model = useModel(MODEL_ARTIFACTS_URL, options);

  const dataReducer = (data) => (input, header) => input.concat([data[header]]);
  const transformDataToModelInput = (data) => COLUMNS.reduce(dataReducer(data), []).map(Number);

  return {
    ml: { model, options },
    analyze: (data) => {
      if (!model) {
        return null;
      }
      const input = transformDataToModelInput(data);
      return model.predict(tf.tensor(input, [1, input.length]));
    },
  };
};
