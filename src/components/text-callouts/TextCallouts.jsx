import { useTranslation } from '../../i18n/LanguageContext';
import React from 'react';
import './TextCallouts.scss';
import { calendar, duration, heart } from '../../constants/imgs/text-callouts';

const callouts = [
  {
    title: 'Reservas flexibles',
    img: calendar,
    text: "Si tus planes cambian, cancela hasta 24 horas antes en la mayoría de los tours y actividades para recibir un reembolso completo.",
  },
  {
    title: 'Acceso más rápido',
    img: duration,
    text: 'Evita las largas filas y disfruta de los lugares del Perú que siempre quisiste conocer.',
  },
  {
    title: 'Atención cercana',
    img: heart,
    text: "Estamos disponibles para ayudarte a vivir una experiencia increíble. Contáctanos por teléfono, correo o WhatsApp.",
  },
];

export const calloutsLength = callouts.length;

const TextCallouts = () => {
  const { t } = useTranslation();
  return (
<div className="text-callouts-container">
    {callouts.map(({ title, img, text }) => (
      <div key={title} className="callout">
        <div className="img-wrapper">
          <img src={img} alt={t(title)} />
        </div>
        <span className="title">{t(title)}</span>
        <span className="description">{t(text)}</span>
      </div>
    ))}
  </div>
  );
};

export default TextCallouts;
