import React from 'react';
import PropTypes from 'prop-types';
import './Selector.scss';
import { capitalCase } from '../../utils/capital-case';
import { LANGUAGES, useTranslation } from '../../i18n/LanguageContext';
import { CURRENCIES } from '../../booking/money';

const Selector = ({ title, options, value, onChange }) => {
  const { t } = useTranslation();
  return (
    <div className="selector-container">
      <span>{t(capitalCase(title))}</span>
      <div className="select-wrapper">
        <select className="select-css" aria-label={t(capitalCase(title))} value={value} onChange={onChange}>
          {options.map((opt) => {
            const languageOption = title === 'idioma' && LANGUAGES.find(({ label }) => label === opt);
            const currencyOption = title === 'moneda' && CURRENCIES.find(({ label }) => label === opt);
            const optionValue = (languageOption && languageOption.code)
              || (currencyOption && currencyOption.code)
              || opt;
            return (
              <option key={title + opt} value={optionValue}>
                {languageOption ? opt : t(opt)}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Selector;

Selector.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
Selector.defaultProps = { value: undefined, onChange: undefined };
