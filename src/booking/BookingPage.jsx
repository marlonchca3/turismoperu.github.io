import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { findTour } from './catalog';
import { GATEWAYS, useBooking } from './BookingContext';
import { convertEuroCents, formatMoney, localDate, validBookingDate } from './money';
import './BookingPage.scss';

function BookingPage() {
  const { tourId } = useParams();
  const tour = findTour(tourId);
  const { t, language } = useTranslation();
  const {
    currency, formatPrice, saveBooking,
  } = useBooking();
  const [date, setDate] = useState(localDate());
  const [travellers, setTravellers] = useState(1);
  const [gateway, setGateway] = useState(GATEWAYS[0]);
  const [booking, setBooking] = useState(null);
  const [dateError, setDateError] = useState(false);

  if (!tour) {
    return (
      <div className="booking-page">
        <Header enforceCurrencyAndLang />
        <main className="booking-content">
          <h1>{t('No encontramos esta actividad.')}</h1>
          <Link to="/">{t('Volver al inicio')}</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const total = formatMoney(
    convertEuroCents(tour.price.original, currency) * travellers,
    currency,
    language,
  );

  const submitBooking = (event) => {
    event.preventDefault();
    if (!validBookingDate(date)) {
      setDateError(true);
      return;
    }
    setDateError(false);
    setBooking(saveBooking({ tour, date, travellers, currency, gateway }));
  };

  return (
    <div className="booking-page">
      <Header enforceCurrencyAndLang />
      <main className="booking-content">
        {booking ? (
          <section className="booking-confirmation" aria-live="polite">
            <h1>{t('Reserva confirmada (demo)')}</h1>
            <p>{t('Tu código de reserva es')}</p>
            <strong>{booking.id}</strong>
            <p>{t('Pago de demostración')}: {booking.gateway}</p>
            <Link to="/">{t('Volver al inicio')}</Link>
          </section>
        ) : (
          <div className="booking-layout">
            <section className="booking-form-section">
              <h1>{t('Reserva tu experiencia')}</h1>
              <h2>{t(tour.title)}</h2>
              <p className="booking-demo-notice">
                <strong>{t('Pago de demostración')}:</strong>{' '}
                {t('Este sitio es una demostración. No se realizará ningún cobro real ni se solicitarán datos de tarjeta.')}
              </p>
              <form onSubmit={submitBooking}>
                <label htmlFor="booking-date">{t('Fecha de la actividad')}</label>
                <input
                  id="booking-date"
                  type="date"
                  min={localDate()}
                  value={date}
                  onChange={(event) => {
                    setDate(event.target.value);
                    setDateError(false);
                  }}
                  required
                />
                {dateError && <span className="booking-error" role="alert">{t('Elige una fecha válida a partir de hoy.')}</span>}

                <label htmlFor="booking-travellers">{t('Personas')}</label>
                <select
                  id="booking-travellers"
                  value={travellers}
                  onChange={(event) => setTravellers(Number(event.target.value))}
                >
                  {Array.from({ length: 12 }, (_, index) => index + 1).map((count) => (
                    <option key={count} value={count}>{count}</option>
                  ))}
                </select>

                <label htmlFor="booking-gateway">{t('Pasarela de pago')}</label>
                <select
                  id="booking-gateway"
                  value={gateway}
                  onChange={(event) => setGateway(event.target.value)}
                >
                  {GATEWAYS.map((name) => (
                    <option key={name} value={name}>{t(`${name} (simulación)`)}</option>
                  ))}
                </select>

                <button type="submit">{t('Simular pago y confirmar reserva')}</button>
              </form>
            </section>

            <aside className="booking-summary">
              {tour.imageUrl && <img src={tour.imageUrl} alt={t(tour.imageAlt || tour.title)} />}
              <h2>{t(tour.title)}</h2>
              <p>{formatPrice(tour.price.original)} × {travellers}</p>
              <strong>{total}</strong>
              <small>{currency}</small>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default BookingPage;
