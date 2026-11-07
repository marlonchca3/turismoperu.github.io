import { DEFAULT_LANGUAGE_CONTEXT, LanguageContext } from '../../i18n/LanguageContext';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { topAttractionsPropType } from '../../propTypes/topAttractionsType';
import { topCountriesPropType } from '../../propTypes/topCountriesType';
import { getTopAttractions } from '../../redux/reducers/topAttractions';
import { fetchTopAttractionsAC } from '../../redux/actions/getTopAttractions';
import { getTopCountries } from '../../redux/reducers/topCountries';
import { fetchTopCountriesAC } from '../../redux/actions/getTopCountries';
import Slider from '../slider/Slider';
import { ReactComponent as Zigzag } from '../../assets/svgs/separators/zigzag.svg';
import './TopWrapper.scss';
import TopAttractionCategories from '../../containers/top-categories/TopAttractionCategories';

export class TopWrapperClass extends React.Component {
  static contextType = LanguageContext;

  componentDidMount() {
    const { fetchTopAttractions, fetchTopCountries } = this.props;
    fetchTopAttractions();
    fetchTopCountries();
  }

  render() {
    const { t = DEFAULT_LANGUAGE_CONTEXT.t } = this.context;
    const { topAttractions, topCountries } = this.props;

    if (!topAttractions.length || !topCountries.length) {
      return null;
    }

    return (
      <div className="top-wrapper-container">
        <div className="separator">
          <Zigzag />
        </div>
        <div className="top-slider">
          <span className="title">{t("Las mejores atracciones del Perú")}</span>
          <Slider data={topAttractions} />
        </div>
        <div className="top-slider">
          <span className="title">{t("Destinos destacados")}</span>
          <Slider data={topAttractions} type="destinations" />
        </div>
        <div className="top-slider">
          <span className="title">{t("Lugares del Perú para visitar")}</span>
          <Slider data={topCountries} type="countries" />
        </div>
        <div className="top-slider">
          <span className="title">{t("Categorías de actividades populares")}</span>
          <TopAttractionCategories />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  topAttractions: getTopAttractions(state),
  topCountries: getTopCountries(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    fetchTopAttractions: fetchTopAttractionsAC,
    fetchTopCountries: fetchTopCountriesAC,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(TopWrapperClass);

TopWrapperClass.propTypes = {
  topAttractions: topAttractionsPropType.isRequired,
  fetchTopAttractions: PropTypes.func.isRequired,
  topCountries: topCountriesPropType.isRequired,
  fetchTopCountries: PropTypes.func.isRequired,
};
