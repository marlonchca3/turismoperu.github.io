import { useTranslation } from '../../i18n/LanguageContext';
import React from 'react';
import './LocationCard.scss';
import { topCityPropType } from '../../propTypes/topCityType';
import {
  boat,
  city,
  food,
  hopOnOff,
  localPin,
  nature,
  sightseeing,
  sun,
  tickets,
  transport,
} from '../../constants/imgs/cityIntro';
import { capitalCase } from '../../utils/capital-case';
import IntroCategorie from './IntroCategorie';

const INTRO_CATEGORIES = [
  { name: 'Entradas a atracciones', img: tickets },
  { name: 'Visitas turísticas', img: sightseeing },
  { name: 'Comida y bebida', img: food },
  { name: 'Excursiones de un día', img: sun },
  { name: 'Cultura local', img: localPin },
  { name: 'Paseos en barco', img: boat },
  { name: 'Transporte', img: transport },
  { name: 'Naturaleza y aventura', img: nature },
  { name: 'Autobús turístico', img: hopOnOff },
  { name: 'Tarjetas turísticas', img: city },
];

const LocationCard = ({ location }) => {
  const { t } = useTranslation();
  const { destination, description, img } = location;
  return (
    <div className="location-card-container">
      <div className="img-container">
        <img src={img} alt={t(destination)} />
      </div>
      <div className="intro-container">
        <span className="title">{capitalCase(destination)}</span>
        <p>{t(description)}</p>
        <div className="categories">
          { INTRO_CATEGORIES.map((categorie) => (
            <IntroCategorie
              key={categorie.name.split(' ').join('').toLocaleLowerCase()}
              name={categorie.name}
              img={categorie.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;

LocationCard.propTypes = {
  location: topCityPropType.isRequired,
};
