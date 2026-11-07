import { useTranslation } from '../../i18n/LanguageContext';
import React from 'react';
import './NoResults.scss';

const NoResults = () => {
  const { t } = useTranslation();
  return (
<div className="no-results-container">
    <span className="title">{t("Sin resultados")}</span>
    <span className="subtitle">{t('Buscamos por todas partes, pero no encontramos resultados.')}</span>
    <span className="small-contact">
      {t('Prueba con otra búsqueda o ')}
      <span className="get-in-touch">{t("contáctanos")}</span>
      {t(' y te ayudaremos a encontrar la experiencia ideal.')}
    </span>
  </div>
  );
};

export default NoResults;
