import {
  DISEASE_PREDICTIONS_STORE,
} from 'src/constants';

export const storePredictions = ({ predictions, symptoms }) => (dispatch) => (
  dispatch({
    type: DISEASE_PREDICTIONS_STORE,
    payload: { predictions, symptoms },
  })
);

export default {
  storePredictions,
};
