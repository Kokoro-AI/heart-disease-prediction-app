import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: false,

    load: 'languageOnly',

    // have a common namespace used around the full app
    ns: ['symptoms', 'common', 'analysis'],
    defaultNS: 'common',

    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    backend: {
      // path where resources get loaded from, or a function
      // returning a path:
      // function(lngs, namespaces) { return customPath; }
      // the returned path will interpolate lng, ns if provided like giving a static path
      loadPath: `${APP_BASE}/locales/{{lng}}/{{ns}}.json`,

      // path to post missing resources
      addPath: `${APP_BASE}/locales/{{lng}}/{{ns}}`,
    },

    react: {
      defaultTransParent: 'div', // needed for preact
      wait: true,
    },
  });

export default i18n;
