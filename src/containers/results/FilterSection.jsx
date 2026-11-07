import { DEFAULT_LANGUAGE_CONTEXT, LanguageContext } from '../../i18n/LanguageContext';
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import './FilterSection.scss';
import { ReactComponent as Caret } from '../../assets/svgs/caret.svg';

class FilterSection extends React.Component {
  static contextType = LanguageContext;

  state = {
    isOpen: false,
  };

  handleOpenOptions = () => {
    this.setState((state) => ({ isOpen: !state.isOpen }));
  };

  render() {
    const { t = DEFAULT_LANGUAGE_CONTEXT.t } = this.context;
    const {
      title, options, filterOptions, optionSelected,
    } = this.props;
    const { isOpen } = this.state;

    return (
      <Route
        render={({ history }) => (
          <div className={`filter-section-container ${title}`}>
            <div
              className={`title ${isOpen ? 'rotate-caret' : ''}`}
              onClick={this.handleOpenOptions}
            >
              <span>{t({ Price: 'Precio', Duration: 'Duración', Services: 'Servicios' }[title] || title)}</span>
              <Caret />
            </div>
            <form className={isOpen ? 'open' : ''}>
              {options.map((option) => (
                <label className="option" key={option.id} htmlFor={option.id}>
                  <input
                    id={option.id}
                    onChange={(e) => filterOptions(e, history, title, option.id)}
                    checked={optionSelected === option.id}
                    type="checkbox"
                    value={option.id}
                  />
                  {t(option.name)}
                </label>
              ))}
            </form>
          </div>
        )}
      />
    );
  }
}

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterOptions: PropTypes.func.isRequired,
  optionSelected: PropTypes.string,
};

FilterSection.defaultProps = {
  optionSelected: '',
};

export default FilterSection;
