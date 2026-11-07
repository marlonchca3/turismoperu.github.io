import { useTranslation } from '../../i18n/LanguageContext';
import React from 'react';
import './BannerContent.scss';
import Search from '../../containers/search/Search';

const BannerContent = () => {
  const { t } = useTranslation();
  return (
<div className="banner-content-container">
    <p className="banner-title">{t("Descubre tours, actividades y destinos del Perú")}</p>
    <Search />
  </div>
  );
};


export default BannerContent;
