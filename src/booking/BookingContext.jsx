import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from '../i18n/LanguageContext';
import { convertEuroCents, formatMoney, isCurrency, validBookingDate } from './money';

export const CURRENCY_KEY = 'machupicchiperu.currency';
export const BOOKINGS_KEY = 'machupicchiperu.demo-bookings.v1';
export const GATEWAYS = ['Niubiz', 'Mercado Pago'];
function read(key) {
  try { return window.localStorage.getItem(key); } catch (error) { return null; }
}
function write(key, value) {
  try { window.localStorage.setItem(key, value); } catch (error) { /* The demo still works in memory. */ }
}
function readBookings() {
  try {
    const data = JSON.parse(read(BOOKINGS_KEY));
    if (!Array.isArray(data)) return [];
    return data.filter((item) => item && typeof item.id === 'string' && item.id.startsWith('DEMO-')
      && typeof item.title === 'string' && typeof item.date === 'string'
      && /^\d{4}-\d{2}-\d{2}$/.test(item.date) && typeof item.tourId === 'number'
      && Number.isInteger(item.travellers) && item.travellers >= 1 && item.travellers <= 12
      && Number.isSafeInteger(item.totalCents) && item.totalCents >= 0
      && isCurrency(item.currency) && GATEWAYS.includes(item.gateway)
      && item.status === 'demo-confirmed').slice(0, 20);
  } catch (error) { return []; }
}
export function createDemoBooking({ tour, date, travellers, currency, gateway }) {
  if (!tour || !Number.isInteger(tour.tourId) || !validBookingDate(date)
    || !Number.isInteger(travellers) || travellers < 1 || travellers > 12
    || !isCurrency(currency) || !GATEWAYS.includes(gateway)) throw new Error('Invalid booking');
  const totalCents = convertEuroCents(tour.price.original, currency) * travellers;
  if (!Number.isSafeInteger(totalCents) || totalCents <= 0) throw new Error('Invalid booking total');
  const suffix = window.crypto && typeof window.crypto.randomUUID === 'function'
    ? window.crypto.randomUUID().slice(0, 8).toUpperCase()
    : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`.toUpperCase();
  return {
    id: `DEMO-${suffix}`, tourId: tour.tourId, title: tour.title, date, travellers,
    currency, gateway, totalCents, status: 'demo-confirmed', createdAt: new Date().toISOString(),
  };
}
const defaultContext = {
  currency: 'EUR', setCurrency: () => {}, bookings: [],
  formatPrice: (raw) => formatMoney(convertEuroCents(raw, 'EUR'), 'EUR', 'es'),
  saveBooking: () => { throw new Error('BookingProvider is required'); },
};
export const BookingContext = createContext(defaultContext);
export function BookingProvider({ children }) {
  const { language } = useTranslation();
  const [currency, updateCurrency] = useState(() => {
    const stored = read(CURRENCY_KEY); return isCurrency(stored) ? stored : 'EUR';
  });
  const [bookings, setBookings] = useState(readBookings);
  const value = useMemo(() => ({
    currency, bookings,
    setCurrency: (next) => {
      if (isCurrency(next)) { updateCurrency(next); write(CURRENCY_KEY, next); }
    },
    formatPrice: (raw) => formatMoney(convertEuroCents(raw, currency), currency, language),
    saveBooking: (details) => {
      const booking = createDemoBooking(details);
      setBookings((current) => {
        const next = [booking, ...current].slice(0, 20);
        write(BOOKINGS_KEY, JSON.stringify(next));
        return next;
      });
      return booking;
    },
  }), [currency, bookings, language]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
BookingProvider.propTypes = { children: PropTypes.node.isRequired };
export const useBooking = () => useContext(BookingContext);
