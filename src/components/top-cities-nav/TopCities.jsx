import { useTranslation } from '../../i18n/LanguageContext';
import React from 'react';
import PropTypes from 'prop-types';
import './TopCities.scss';
import TopCity from './TopCity';

export const CITIES = [
  'amsterdam',
  'barcelona',
  'berlin',
  'dubai',
  'london',
  'new-york-city',
  'paris',
  'rome',
];

const TopCities = ({ fetchCity, activeCity }) => {
  const { t } = useTranslation();
  return (
<div className="top-cities-container">
    <span className="title">{t("Explora nuestros mejores destinos")}</span>
    <div className="top-cities">
      {CITIES.map((city) => (
        <TopCity
          key={city}
          city={city}
          activeCity={activeCity}
          fetchCity={fetchCity}
        />
      ))}
    </div>
  </div>
  );
};

export default TopCities;

TopCities.propTypes = {
  activeCity: PropTypes.string.isRequired,
  fetchCity: PropTypes.func.isRequired,
};
