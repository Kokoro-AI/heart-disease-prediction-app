import * as Yup from 'yup';
import { messages } from './common';

export const symptomsFormValidation = () => Yup.object().shape({
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
