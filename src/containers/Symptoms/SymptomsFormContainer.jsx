import { reduxForm } from 'redux-form';
import SymptomsContainer from './SymptomsContainer';

const SymptomsFormContainer = reduxForm({
  form: 'symptoms',
})(SymptomsContainer);

export default SymptomsFormContainer;
