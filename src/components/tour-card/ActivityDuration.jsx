import { useTranslation } from '../../i18n/LanguageContext';
import React from 'react';
import PropTypes from 'prop-types';
import './ActivityDuration.scss';
import { ReactComponent as Time } from '../../assets/svgs/time.svg';
import { ReactComponent as Duration } from '../../assets/svgs/aboutTour/duration.svg';

const ActivityDuration = ({
  page, duration, position,
}) => {
  const { t } = useTranslation();
  return (
<div className={`activity-duration ${page} ${position}`}>
    {position === 'top' ? <Time /> : <Duration />}
    <div className="activity-duration-title">{t("Duración:")}</div>
    <span>{t(duration)}</span>
  </div>
  );
};

export default ActivityDuration;

ActivityDuration.propTypes = {
  page: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};
