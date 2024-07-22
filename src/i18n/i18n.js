import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HOME_EN from '~/locales/en/home.json';
import ABOUT_EN from '~/locales/en/about.json';
import HEADER_EN from '~/locales/en/header.json';
import CONTACT_EN from '~/locales/en/contact.json';
import AUTHENTICATION_EN from '~/locales/en/authentication.json';

import HOME_VI from '~/locales/vi/home.json';
import ABOUT_VI from '~/locales/vi/about.json';
import HEADER_VI from '~/locales/vi/header.json';
import CONTACT_VI from '~/locales/vi/contact.json';
import AUTHENTICATION_VI from '~/locales/vi/authentication.json';

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt',
};

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    home: HOME_EN,
    about: ABOUT_EN,
    header: HEADER_EN,
    contact: CONTACT_EN,
    auth: AUTHENTICATION_EN,
  },
  vi: {
    home: HOME_VI,
    about: ABOUT_VI,
    header: HEADER_VI,
    contact: CONTACT_VI,
    auth: AUTHENTICATION_VI,
  },
};

const defaultNS = 'home';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    ns: ['home', 'about', 'header'],
    fallbackLng: 'en',
    defaultNS,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
