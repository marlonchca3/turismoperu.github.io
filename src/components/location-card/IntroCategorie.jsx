import { useTranslation } from '../../i18n/LanguageContext';
import React from 'react';
import PropTypes from 'prop-types';
import './IntroCategorie.scss';

const IntroCategorie = ({ name, img }) => {
  const { t } = useTranslation();
  return (
<div className="categorie-container">
    <img src={img} alt={t(name)} />
    <div className="intro-categorie">
      <span className="categorie">{t(name)}</span>
    </div>
  </div>
  );
};

export default IntroCategorie;

IntroCategorie.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
