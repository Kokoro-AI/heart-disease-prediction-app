import {
  DISEASE_PREDICTIONS_STORE,
} from 'src/constants';

export const storePredictions = ({ predictions, symbols }) => (dispatch) => (
  dispatch({
    type: DISEASE_PREDICTIONS_STORE,
    payload: { predictions, symbols },
  })
);

export default {
  storePredictions,
};
