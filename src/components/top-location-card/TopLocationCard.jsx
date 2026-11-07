import { useTranslation } from '../../i18n/LanguageContext';
import React from 'react';
import PropTypes from 'prop-types';
import './TopLocationCard.scss';

const TopLocationCard = ({
  location, count, img, type,
}) => {
  const { t } = useTranslation();
  return (
<div className={`top-location-card-container ${type}`}>
    <img src={img} alt={t(location)} />
    <div className="top-location-details">
      <span className="title">{t(location)}</span>
      <span className="count">{t(`${count} tours y actividades`)}</span>
    </div>
  </div>
  );
};

export default TopLocationCard;

TopLocationCard.propTypes = {
  location: PropTypes.string.isRequired,
  count: PropTypes.number,
  img: PropTypes.string.isRequired,
  type: PropTypes.string,
};

TopLocationCard.defaultProps = {
  type: 'top-city',
  count: null,
};
