import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { LanguageProvider, LANGUAGE_STORAGE_KEY } from './LanguageContext';
import Footer from '../components/footer/Footer';
import { translate } from './translations';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  document.documentElement.lang = 'es';
  jest.restoreAllMocks();
});

it('offers exactly three languages and translates the page when the selector changes', () => {
  const { getByLabelText, getByText } = render(<LanguageProvider><Footer /></LanguageProvider>);
  const selector = getByLabelText('Idioma');
  expect(Array.from(selector.options).map((option) => option.text)).toEqual(['Español', 'English', 'Português']);
  fireEvent.change(selector, { target: { value: 'en' } });
  expect(getByText('Payment methods')).toBeInTheDocument();
  expect(getByLabelText('Language').value).toBe('en');
  expect(document.documentElement.lang).toBe('en');
  expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en');
  fireEvent.change(getByLabelText('Language'), { target: { value: 'pt' } });
  expect(getByText('Formas de pagamento')).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('pt');
});

it('restores a saved language and ignores unsupported stored values', () => {
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'pt');
  const first = render(<LanguageProvider><Footer /></LanguageProvider>);
  expect(first.getByLabelText('Idioma').value).toBe('pt');
  first.unmount();
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'fr');
  const second = render(<LanguageProvider><Footer /></LanguageProvider>);
  expect(second.getByLabelText('Idioma').value).toBe('es');
});

it('still switches language when browser storage is unavailable', () => {
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Storage blocked'); });
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage blocked'); });
  const { getByLabelText, getByText } = render(<LanguageProvider><Footer /></LanguageProvider>);
  fireEvent.change(getByLabelText('Idioma'), { target: { value: 'en' } });
  expect(getByText('Payment methods')).toBeInTheDocument();
});

it('translates dynamic tour content without altering place names, whitespace or unknown values', () => {
  expect(translate('Machu Picchu: descubre la ciudadela inca', 'en')).toBe('Machu Picchu: discover the Inca citadel');
  expect(translate('  13 tours encontrados.', 'en')).toBe('  13 tours found.');
  expect(translate('1 horas', 'en')).toBe('1 hour');
  expect(translate('1.5 horas', 'en')).toBe('1.5 hours');
  expect(translate('90 minutos - 2 horas', 'en')).toBe('90 minutes – 2 hours');
  expect(translate('3-5 horas', 'pt')).toBe('3-5 horas');
  expect(translate('1632 opiniones', 'pt')).toBe('1632 avaliações');
  expect(translate('Prueba con otra búsqueda o ', 'en')).toBe('Try another search or ');
  expect(translate('Cusco', 'pt')).toBe('Cusco');
  expect(translate(null, 'en')).toBe(null);
});
