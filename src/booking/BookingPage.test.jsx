import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { LanguageProvider } from '../i18n/LanguageContext';
import { BookingProvider, BOOKINGS_KEY } from './BookingContext';
import BookingPage from './BookingPage';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

test('creates a clearly simulated booking using the selected currency and gateway', () => {
  const { getAllByLabelText, getByLabelText, getByText } = render(
    <MemoryRouter initialEntries={['/reserva/37483']}>
      <LanguageProvider>
        <BookingProvider>
          <Route path="/reserva/:tourId" component={BookingPage} />
        </BookingProvider>
      </LanguageProvider>
    </MemoryRouter>,
  );

  fireEvent.change(getAllByLabelText('Moneda')[0], { target: { value: 'PEN' } });
  fireEvent.change(getByLabelText('Personas'), { target: { value: '2' } });
  fireEvent.change(getByLabelText('Pasarela de pago'), { target: { value: 'Mercado Pago' } });
  expect(document.body.textContent).toContain('317.66');
  fireEvent.click(getByText('Simular pago y confirmar reserva'));

  expect(getByText('Reserva confirmada (demo)')).toBeTruthy();
  expect(window.localStorage.getItem(BOOKINGS_KEY)).toContain('"currency":"PEN"');
  expect(window.localStorage.getItem(BOOKINGS_KEY)).toContain('"gateway":"Mercado Pago"');
});
