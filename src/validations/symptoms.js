import i18next from 'i18next';
import * as Yup from 'yup';

const messages = {};

i18next.loadNamespaces('common', () => {
  messages.required = () => i18next.t('common:validators.messages.required');
  messages.maximum = (max) => i18next.t('common:validators.messages.maximum', { max });
  messages.minimum = (min) => i18next.t('common:validators.messages.minimum', { min });
  messages.date = (format) => i18next.t('common:validators.messages.date', { format });
  messages.numericality = () => i18next.t('common:validators.messages.numericality');
  messages.positive = () => i18next.t('common:validators.messages.positive');
  messages.between = (min, max) => i18next.t('common:validators.messages.between', { min, max });
  messages.confirmation = (field) => i18next.t('common:validators.messages.confirmation', { field });
});

export const symptomsFormValidation = Yup.object().shape({
  fullName: Yup.string()
    .required(messages.required()),
  date: Yup
    .date(messages.date('DD/MM/YYYY'))
    .required(messages.required()),
  age: Yup.number()
    .positive(messages.positive())
    .required(messages.required()),
  sex: Yup.string().required(messages.required()),
  chestPainType: Yup.string().required(messages.required()),
  restingBloodPressure: Yup.number()
    .positive(messages.positive())
    .required(messages.required()),
  cholesterol: Yup.number()
    .positive(messages.positive())
    .required(messages.required()),
  fastingBloodSugar: Yup.string().required(messages.required()),
  restEcg: Yup.string().required(messages.required()),
  maxHeartRateAchieved: Yup.number()
    .positive(messages.positive())
    .required(messages.required()),
  stDepression: Yup.number()
    .positive(messages.positive())
    .required(messages.required()),
  stSlope: Yup.string().required(messages.required()),
  numMajorVessels: Yup.number()
    .min(0, messages.minimum(0))
    .max(3, messages.maximum(0))
    .required(messages.required()),
  thalassemia: Yup.string().required(messages.required()),
});

export default { symptomsFormValidation };
