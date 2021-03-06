import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import { getUrl } from 'api/helpers';
import store from 'store';
import { setLanguage } from 'store/modules/App/actions';

const getLocaleMessages = messages =>
  messages.reduce(
    (parsedMessages, { message, translation }) => ({
      ...parsedMessages,
      [message]: translation
    }),
    {}
  );

const getMessages = data =>
  data.reduce(
    (localeMessages, { messages = [] }) => ({
      ...localeMessages,
      ...getLocaleMessages(messages)
    }),
    {}
  );

const url = `${getUrl('i18n')}/{{lng}}/{{ns}}`;

const languageSupported = (language) => {
  const state = store.getState()

  return state.App.languages.some(({ value }) => language === value)
}

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      addPath: url,
      loadPath: url,
      parse(body) {
        const { data } = JSON.parse(body);
        return getMessages(data);
      }
    },
    debug: false,
    fallbackLng: 'en',
    preload: ['en', 'sv'],
    interpolation: {
      escapeValue: false
    },
    saveMissing: true,
    defaultNS: 'common',
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }
  });

i18n.on('languageChanged', language => {
  if (languageSupported(language)) {
    store.dispatch(setLanguage(language));
  }
});

export default i18n;
