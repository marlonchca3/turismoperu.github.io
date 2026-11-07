import { DEFAULT_LANGUAGE_CONTEXT, LanguageContext } from '../../i18n/LanguageContext';
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { activityPropTypes } from '../../propTypes/activityType';
import './TourCard.scss';
import TourCardDetails from './TourCardDetails';

class TourCard extends React.Component {
  static contextType = LanguageContext;

  render() {
    const { t = DEFAULT_LANGUAGE_CONTEXT.t } = this.context;
    const { activity, isResult } = this.props;
    const {
      imageUrl,
      imageAlt,
    } = activity;
    const page = isResult ? 'result' : 'home';
    return (
      <div className={`tourcard-container ${page}`}>
        <div className={`tourcard-image ${page}`}>
          <img src={imageUrl} alt={t(imageAlt)} />
        </div>
        <TourCardDetails
          isResult={isResult}
          activity={activity}
        />
      </div>
    );
  }
}

export default TourCard;

TourCard.propTypes = {
  activity: activityPropTypes.isRequired,
  isResult: PropTypes.bool.isRequired,
};
