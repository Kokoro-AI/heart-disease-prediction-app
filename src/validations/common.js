import i18next from 'i18next';

export const messages = {};

i18next.loadNamespaces('common', () => {
  messages.required = () => i18next.t('common:validators.messages.required');
  messages.maximum = (max) => i18next.t('common:validators.messages.maximum', { max });
  messages.minimum = (min) => i18next.t('common:validators.messages.minimum', { min });
  messages.date = (format) => i18next.t('common:validators.messages.date', { format });
  messages.numericality = () => i18next.t('common:validators.messages.numericality');
  messages.positive = () => i18next.t('common:validators.messages.positive');
  messages.between = (min, max) => i18next.t('common:validators.messages.between', { min, max });
  messages.confirmation = (field) => i18next.t('common:validators.messages.confirmation', { field });
  messages.slug = () => i18next.t('common:validators.messages.slug');
});

export default { messages };
