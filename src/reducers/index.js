import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import formReducer from './form';
import diseaseReducer from './disease';

export default (history) => combineReducers({
  router: connectRouter(history),
  form: formReducer,
  disease: diseaseReducer,
});
