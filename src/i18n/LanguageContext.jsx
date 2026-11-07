import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { translate } from './translations';

export const LANGUAGES = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
];
export const LANGUAGE_STORAGE_KEY = 'machupicchiperu.language';
const isSupported = (value) => LANGUAGES.some(({ code }) => code === value);
const ignoreChange = () => {};

export const DEFAULT_LANGUAGE_CONTEXT = {
  language: 'es', setLanguage: ignoreChange, t: (text) => translate(text, 'es'),
};
export const LanguageContext = createContext(DEFAULT_LANGUAGE_CONTEXT);

function initialLanguage() {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSupported(stored) ? stored : 'es';
  } catch (error) {
    return 'es';
  }
}

export function LanguageProvider({ children }) {
  const [language, updateLanguage] = useState(initialLanguage);
  const value = useMemo(() => ({
    language,
    setLanguage: (next) => { if (isSupported(next)) updateLanguage(next); },
    t: (text) => translate(text, language),
  }), [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      // Language switching also works when browser storage is unavailable.
    }
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
LanguageProvider.propTypes = { children: PropTypes.node.isRequired };
export const useTranslation = () => useContext(LanguageContext);
