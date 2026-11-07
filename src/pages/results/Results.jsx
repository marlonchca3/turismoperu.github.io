import { DEFAULT_LANGUAGE_CONTEXT, LanguageContext } from '../../i18n/LanguageContext';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { fetchDestinationsToursAC } from '../../redux/actions/getDestinationsTours';
import Header from '../../components/header/Header';
import ResultsItems from '../../containers/results/ResultsItems';
import FilterSection from '../../containers/results/FilterSection';
import NoResults from '../../components/results/NoResults';
import Newsletter from '../../containers/newsletter/Newsletter';
import Footer from '../../components/footer/Footer';
import { ReactComponent as Caret } from '../../assets/svgs/caret.svg';
import { capitalCase } from '../../utils/capital-case';
import './Results.scss';

const SELECT_SORT = [
  'Recomendados',
  'Precio (de menor a mayor)',
  'Precio (de mayor a menor)',
  'Valoración (de mayor a menor)',
];

export const SERVICES = [
  { name: 'Tour privado', id: 'private-tour' },
  { name: 'Accesible en silla de ruedas', id: 'wheelchair-accessible' },
  { name: 'Sin filas', id: 'skip-the-line' },
  { name: 'Recogida en el hotel', id: 'hotel-pickup' },
  { name: 'Grupo reducido', id: 'small-group' },
  { name: 'Medidas de salud adicionales', id: 'additional-health' },
];

export const DURATION = [
  { name: '0-3 horas', id: '0-3' },
  { name: '3-5 horas', id: '3-5' },
  { name: '5-7 horas', id: '5-7' },
  { name: 'Día completo (7 horas o más)', id: '7' },
  { name: 'Varios días', id: 'n' },
];

export const PRICE = [
  { name: '0 - 25', id: '0-25' },
  { name: '25 - 50', id: '25-50' },
  { name: '50 - 75', id: '50-75' },
  { name: '75 - 100', id: '75-100' },
  { name: '100 +', id: '100' },
];

export const SECTIONS = [
  { title: 'Price', options: PRICE },
  { title: 'Duration', options: DURATION },
  { title: 'Services', options: SERVICES },
];

class Results extends React.Component {
  static contextType = LanguageContext;

  state = {
    openFilters: false,
    optionsSelected: {},
  };

  componentDidMount() {
    const { match } = this.props;

    this.fetchResults(match.params.city);
    this.setState({ optionsSelected: {} });
  }

  fetchResults = async (path) => {
    const { fetchDestinationsTours } = this.props;

    fetchDestinationsTours(path);
  }

  filterOptions = (e, history, title, optionId) => {
    const { match } = this.props;
    const { optionsSelected } = this.state;
    const currentUrlParams = new URLSearchParams(history.location.search);

    if (optionId === optionsSelected[title]) {
      this.setState((state) => ({
        optionsSelected: { ...state.optionsSelected, [title]: '' },
      }));

      currentUrlParams.delete(title);
    } else {
      this.setState((state) => ({
        optionsSelected: { ...state.optionsSelected, [title]: optionId },
      }));

      currentUrlParams.set(title, optionId);
    }

    this.fetchResults(`${match.params.city}?${currentUrlParams}`);
    history.push(`${history.location.pathname}?${currentUrlParams}`);
  };

  openFilters = () => {
    this.setState((state) => ({ openFilters: !state.openFilters }));
  };

  render() {
    const { t = DEFAULT_LANGUAGE_CONTEXT.t } = this.context;
    const { tours, match } = this.props;
    const { openFilters, optionsSelected } = this.state;

    return (
      <div className="results-container">
        <div className="results-header">
          <Header enforceCurrencyAndLang showSearchBar />
        </div>
        <div className="sort">
          <div className="results-found">
            <span className="searched-input">{capitalCase(match.params.city)}</span>
            <span className="results-number">
              {t(`  ${tours.length} tours encontrados.`)}
            </span>
          </div>
          <div className="sort-by">
            <span>{t("Ordenar por:")}</span>
            <select id="sort-by">
              {SELECT_SORT.map((option) => (
                <option key={option} value={option}>
                  {t(option)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="main-content">
          <div className="open-filters" onClick={this.openFilters}>
            <span>{t("Filtrar resultados")}</span>
            <Caret />
          </div>
          <div
            className={`filter-content ${openFilters ? ' show' : ' hide'}`}
          >
            {SECTIONS.map((section) => (
              <FilterSection
                key={section.title}
                title={section.title}
                options={section.options}
                optionSelected={optionsSelected[section.title]}
                filterOptions={this.filterOptions}
              />
            ))}
          </div>
          {tours.length ? <ResultsItems tours={tours} /> : <NoResults />}
        </div>
        <Newsletter />
        <Footer />
      </div>
    );
  }
}

Results.propTypes = {
  tours: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.exact({
    isExact: PropTypes.bool,
    params: PropTypes.shape({ city: PropTypes.string }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  fetchDestinationsTours: PropTypes.func.isRequired,
};

Results.defaultProps = {
  tours: [],
};

const mapStateToProps = (state) => ({
  tours: state.destinationsTours.tours,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    fetchDestinationsTours: fetchDestinationsToursAC,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Results);
