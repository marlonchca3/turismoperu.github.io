import { useTranslation } from '../../i18n/LanguageContext';
import { useBooking } from '../../booking/BookingContext';
import { Link } from 'react-router-dom';
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { activityPropTypes } from '../../propTypes/activityType';
import { isResultPropType } from '../../propTypes/isRestultPropType';
import './TourCardDetails.scss';
import Stamp from './Stamp';
import RatingStars from './RatingStars';
import ActivityDuration from './ActivityDuration';
import { ReactComponent as Like } from '../../assets/svgs/like.svg';
import { ReactComponent as LikeHome } from '../../assets/svgs/like-home.svg';

const TourCardDetails = ({ activity, isResult }) => {
    const { t } = useTranslation();
    const { formatPrice } = useBooking();
    const {
      title,
      duration,
      isGygOriginal,
      price,
      cardBannerMessage,
      smallDescription,
      freeCancellationFlag,
      totalRating,
      totalRatingTitle,
      averageRating,
    } = activity;
    const page = isResult ? 'result' : 'home';
    return (
      <div className={`tour-details-container ${page}`}>
        <div className="header">
          <span className="tour-details-title">{t(title)}</span>
          <div className="like">
            {isResult ? <Like /> : <LikeHome />}
          </div>
        </div>
        <div className={`rating-horizontal ${page}`}>
          <div className={`rating-stars-container ${page} top`}>
            <RatingStars averageRating={averageRating} />
            <span className="rating">{ totalRating}</span>
            <span className="rating-title">{ t(totalRatingTitle) }</span>
          </div>
          {isGygOriginal && (
            <Stamp position="top" sentKey="gygOriginal" page={page} />
          )}
        </div>
        <ActivityDuration
          page={page}
          duration={duration}
          position="top"
        />
        <div className={`tour-description ${page}`}>{t(smallDescription)}</div>
        <ActivityDuration
          page={page}
          duration={duration}
          position="bottom"
        />
        {isGygOriginal && (
          <Stamp position="bottom" sentKey="gygOriginal" page={page} />
        )}
        {isResult && freeCancellationFlag && (
          <span className="free-cancellation-flag">{t("Cancelación gratuita hasta 24 horas antes")}</span>
        )}
        <div className="tour-details-overall">
          <div className={`rating-column ${page}`}>
            <div className={`rating-stars-container ${page} bottom`}>
              <RatingStars averageRating={averageRating} />
              <span className="rating">{ totalRating}</span>
              <span className="rating-title">{ t(totalRatingTitle) }</span>
            </div>
          </div>

          <div className="tour-price">
            <span className="from-price">{t("Desde")}</span>
            <span className="price">{formatPrice(price.original)}</span>
            {!isResult && (
              <span className="card-details-message">{t(cardBannerMessage)}</span>
            )}
          </div>
        </div>
        {activity.tourId != null && (
          <Link className="booking-cta" to={`/reserva/${activity.tourId}`}>{t('Reservar')}</Link>
        )}
      </div>
    );
};

export default TourCardDetails;

TourCardDetails.propTypes = {
  activity: activityPropTypes.isRequired,
  isResult: isResultPropType.isRequired,
};
