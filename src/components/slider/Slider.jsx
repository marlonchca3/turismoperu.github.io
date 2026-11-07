import React from 'react';
import PropTypes from 'prop-types';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import './Slider.scss';
import TopLocationCard from '../top-location-card/TopLocationCard';
import { topAttractionsPropType } from '../../propTypes/topAttractionsType';
import { topCountriesPropType } from '../../propTypes/topCountriesType';

const SLIDER_OPTIONS = {
  perPage: 5,
  perMove: 1,
  type: 'loop',
  gap: '1rem',
  pagination: false,
  breakpoints: {
    479: { perPage: 1 },
    767: { perPage: 2 },
    1023: { perPage: 3 },
    1399: { perPage: 4 },
  },
};

const Slider = ({ data, type }) => {
  if (!data) {
    return null;
  }

  return (
    <div className="slider-container">
      <Splide
        options={SLIDER_OPTIONS}
      >
        {data.map((attraction) => (
          <SplideSlide key={attraction.destination + attraction.count}>
            <TopLocationCard
              location={attraction.destination}
              count={attraction.activitiesCount}
              img={attraction.img}
              type={type}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Slider;

Slider.propTypes = {
  type: PropTypes.string,
  data: PropTypes.oneOfType([topAttractionsPropType, topCountriesPropType]).isRequired,
};

Slider.defaultProps = {
  type: 'top-city',
};
