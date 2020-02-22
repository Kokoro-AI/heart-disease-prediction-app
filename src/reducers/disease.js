import initialState from 'src/state/disease';
import {
  DISEASE_PREDICTIONS_STORE,
} from 'src/constants';

const mutations = {
  [DISEASE_PREDICTIONS_STORE](state, { symptoms, predictions }) {
    return {
      ...state,
      symptoms,
      predictions,
    };
  },
};

/* eslint-disable-next-line */
export default (state = initialState, action) => (mutations.hasOwnProperty(action.type)
  ? mutations[action.type](state, action.payload)
  : state);
