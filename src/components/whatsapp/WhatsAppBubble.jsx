import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import './WhatsAppBubble.scss';

const WHATSAPP_NUMBER = '51984625171';

function WhatsAppBubble() {
  const { t } = useTranslation();
  const message = encodeURIComponent(t('Hola, quisiera hacer una consulta sobre sus tours.'));

  return (
    <a
      className="whatsapp-menu-button"
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('¿Tienes dudas? Escríbenos')}
    >
      <svg className="whatsapp-menu-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16 3.2A12.6 12.6 0 0 0 5.2 22.3L3.5 28.5l6.3-1.6A12.6 12.6 0 1 0 16 3.2Zm0 22.9a10.3 10.3 0 0 1-5.3-1.5l-.4-.2-3.7 1 1-3.6-.3-.4A10.3 10.3 0 1 1 16 26.1Zm5.7-7.7c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.8-2.1-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6-.1-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.2 3.2c.2.2 2.2 3.4 5.4 4.8.8.3 1.4.5 1.8.6.8.2 1.5.2 2 .1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z" />
      </svg>
      <span>{t('WhatsApp')}</span>
    </a>
  );
}

export default WhatsAppBubble;
