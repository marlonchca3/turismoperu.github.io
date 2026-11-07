import { useTranslation } from '../../i18n/LanguageContext';
import React from 'react';
import PropTypes from 'prop-types';
import './Stamp.scss';

const STAMPS = {
  default: 'Encuentra tu próxima aventura',
  gygOriginal: 'machupicchiperu Original',
};

const getStampKey = (sentKey) => {
  if (!STAMPS[sentKey]) {
    return 'default';
  }
  return sentKey;
};

const Stamp = ({ position, sentKey, page }) => {
  const { t } = useTranslation();
  const stampKey = getStampKey(sentKey);
  return (
    <div className="stamp-container">
      <span className={`${stampKey} ${position} ${page}`}>{t(STAMPS[stampKey])}</span>
    </div>
  );
};

export default Stamp;

Stamp.propTypes = {
  position: PropTypes.string.isRequired,
  sentKey: PropTypes.string,
  page: PropTypes.string.isRequired,
};

Stamp.defaultProps = {
  sentKey: 'default',
};
