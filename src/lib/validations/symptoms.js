import {
  required as requiredValidator,
  numericality as numericalityValidator,
} from 'redux-form-validators';

import i18next from 'i18next';

const messages = {};

i18next.loadNamespaces('symptoms', () => {
  messages.required = () => i18next.t('symptoms:form.validators.messages.required');
  messages.positive = () => i18next.t('symptoms:form.validators.messages.positive');
  messages.between = (min, max) => i18next.t('symptoms:form.validators.messages.between', { min, max });
});


export const required = (opt) => requiredValidator({
  message: messages.required(),
  ...opt,
});

export const positive = (opt) => numericalityValidator({
  message: messages.positive(),
  greaterThanOrEqualTo: 0,
  ...opt,
});

export const between = (min = 0, max = 3, opt) => numericalityValidator({
  message: messages.between(min, max),
  greaterThanOrEqualTo: min,
  lessThanOrEqualTo: max,
  ...opt,
});
