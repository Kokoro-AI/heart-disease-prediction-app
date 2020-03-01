import { reduxForm } from 'redux-form';
import SymptomsForm from 'src/components/Symptoms/Form';

const SymptomsFormContainer = reduxForm({
  form: 'symptoms',
  enableReinitialize: true,
})(SymptomsForm);

export default SymptomsFormContainer;
