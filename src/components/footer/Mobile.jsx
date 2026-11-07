import { useTranslation } from '../../i18n/LanguageContext';
import React from 'react';
import './Mobile.scss';
import { appleStoreUrl } from '../../constants/imgs/apple-store';
import { googlePlayUrl } from '../../constants/imgs/google-play';

const Mobile = () => {
  const { t } = useTranslation();
  return (
<div className="mobile">
    <span>{t("Aplicación móvil")}</span>
    <div className="download">
      <img src={googlePlayUrl} alt={t("google play")} />
      <img src={appleStoreUrl} alt={t("apple store")} />
    </div>
  </div>
  );
};

export default Mobile;
