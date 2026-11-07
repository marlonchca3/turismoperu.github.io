import React from 'react';
import { render } from '@testing-library/react';
import { LanguageProvider } from '../../i18n/LanguageContext';
import WhatsAppBubble from './WhatsAppBubble';

test('links to WhatsApp from the menu with the configured contact and a prefilled message', () => {
  const { getByLabelText } = render(
    <LanguageProvider>
      <WhatsAppBubble />
    </LanguageProvider>,
  );

  const link = getByLabelText('¿Tienes dudas? Escríbenos');
  expect(link.getAttribute('href')).toBe(
    'https://wa.me/51984625171?text=Hola%2C%20quisiera%20hacer%20una%20consulta%20sobre%20sus%20tours.',
  );
  expect(link.getAttribute('target')).toBe('_blank');
  expect(link.getAttribute('rel')).toBe('noopener noreferrer');
});
