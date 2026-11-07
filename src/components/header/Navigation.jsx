import { LANGUAGES, useTranslation } from '../../i18n/LanguageContext';
import React from 'react';
import './Navigation.scss';
import PropTypes from 'prop-types';
import { ReactComponent as Like } from '../../assets/svgs/like.svg';
import { ReactComponent as Basket } from '../../assets/svgs/basket.svg';
import { ReactComponent as Help } from '../../assets/svgs/help.svg';
import { ReactComponent as User } from '../../assets/svgs/user.svg';
import { ReactComponent as Caret } from '../../assets/svgs/caret.svg';
import Button from '../button/Button';
import { CURRENCIES } from '../../booking/money';
import { useBooking } from '../../booking/BookingContext';
import WhatsAppBubble from '../whatsapp/WhatsAppBubble';

export const ICONS = [
  { id: 'language', text: 'Español' },
  { id: 'currency', text: 'EUR' },
  { id: 'wishlist', icon: <Like />, text: 'Favoritos' },
  { id: 'basket', icon: <Basket />, text: 'Carrito' },
  { id: 'help', icon: <Help />, text: 'Ayuda' },
  { id: 'login', icon: <User />, text: 'Iniciar sesión' },
];

const hasDropdown = ['login'];

const renderDropdown = (id, t) => (hasDropdown.includes(id)) && (
<div className="dropdown-content">
  <span className="section-title">{t('Opciones')}</span>
  <button type="button" className="drop-item">
    {t('Ejemplo')}
  </button>
  <button type="button" className="drop-item">
    {t('Ejemplo')}
  </button>
  <button type="button" className="drop-item">
    {t('Ejemplo')}
  </button>
  <button type="button" className="drop-item">
    {t('Ejemplo')}
  </button>
</div>
);

const renderCaret = (id) => (hasDropdown.includes(id)) && <Caret />;

const NavigationList = ({ enforceCurrencyAndLang }) => {
  const { t, language, setLanguage } = useTranslation();
  const { currency, setCurrency } = useBooking();
  return (
  <div className="navigation-list-container">
    {ICONS.map((icon) => (
      <div
        className={`nav-item
          ${enforceCurrencyAndLang && (icon.id === 'currency' || icon.id === 'language')
          ? 'curr-lang-icons'
          : 'other-icons'}`}
        key={`item${icon.id}`}
      >
        <div className="menu-item">
          {icon.id === 'language' ? (
            <select className="header-language-select" aria-label={t('Idioma')} value={language} onChange={(event) => setLanguage(event.target.value)}>
              {LANGUAGES.map(({ code, label }) => <option key={code} value={code}>{label}</option>)}
            </select>
          ) : icon.id === 'currency' ? (
            <select className="header-currency-select" aria-label={t('Moneda')} value={currency} onChange={(event) => setCurrency(event.target.value)}>
              {CURRENCIES.map(({ code, label }) => <option key={code} value={code}>{t(label)}</option>)}
            </select>
          ) : (
            <>
          {icon.icon}
          <div className="item-info">
            <span>{t(icon.text)}</span>
            <div className="caret">{renderCaret(icon.id)}</div>
          </div>
            </>
          )}
        </div>
        {renderDropdown(icon.id, t)}
      </div>
    ))}
    <div className="whatsapp-nav-item">
      <WhatsAppBubble />
    </div>
    <div className={`signup-btn ${enforceCurrencyAndLang ? 'show-ipad' : ''}`}>
      <Button btnClass="bg-blue" text="Regístrate" />
    </div>
  </div>
  );
};

NavigationList.propTypes = {
  enforceCurrencyAndLang: PropTypes.bool,
};

NavigationList.defaultProps = {
  enforceCurrencyAndLang: false,
};

export default NavigationList;
