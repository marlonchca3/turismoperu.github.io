import { LANGUAGES, useTranslation } from '../../i18n/LanguageContext';
import React from 'react';
import './Footer.scss';
import Selector from './Selector';
import Mobile from './Mobile';
import FooterNavigation from '../../containers/footer/FooterNavigation';
import PayMethods from './PayMethods';
import { ReactComponent as Facebook } from '../../assets/svgs/socialMedia/facebook.svg';
import { ReactComponent as Instagram } from '../../assets/svgs/socialMedia/instagram.svg';
import { ReactComponent as Linkedin } from '../../assets/svgs/socialMedia/linkedin.svg';
import { ReactComponent as Pinterest } from '../../assets/svgs/socialMedia/pinterest.svg';
import { ReactComponent as Twitter } from '../../assets/svgs/socialMedia/twitter.svg';
import { CURRENCIES } from '../../booking/money';
import { useBooking } from '../../booking/BookingContext';

export const language = LANGUAGES.map(({ label }) => label);

export const currency = CURRENCIES.map(({ label }) => label);

export const support = ['Contacto', 'Legal', 'Política de privacidad', 'Condiciones de uso'];

export const company = [
  'Sobre nosotros',
  'Empleo',
  'Blog',
  'Prensa',
  'Tarjetas de regalo',
  'Revista',
];

export const workWithUs = [
  'Administración de proveedores',
  'Administración de afiliados',
];

const Footer = () => {
  const { t, language: currentLanguage, setLanguage } = useTranslation();
  const { currency: currentCurrency, setCurrency } = useBooking();
  return (
<div className="footer-container">
    <div className="selectors">
      <Selector title="idioma" options={language} value={currentLanguage} onChange={(event) => setLanguage(event.target.value)} />
      <Selector title="moneda" options={currency} value={currentCurrency} onChange={(event) => setCurrency(event.target.value)} />
    </div>
    <Mobile />
    <FooterNavigation title="Ayuda" items={support} />
    <FooterNavigation title="Empresa" items={company} />
    <FooterNavigation title="Trabaja con nosotros" items={workWithUs} />
    <PayMethods />

    <div className="copyrights-social">
      <span>{t("© machupicchiperu. Turismo y experiencias en Perú.")}</span>
      <div className="social">
        <Facebook />
        <Instagram />
        <Linkedin />
        <Pinterest />
        <Twitter />
      </div>
    </div>
  </div>
  );
};

export default Footer;
