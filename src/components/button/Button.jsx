import { useTranslation } from '../../i18n/LanguageContext';
import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';
import { ReactComponent as SearchIcon } from '../../assets/svgs/search.svg';

const mockFunc = () => {
  window.alert('sorry, click not allowed');
};

const Button = ({ btnClass, text, click }) => {
  const { t } = useTranslation();
  return (
<button type="submit" className={`btn ${btnClass} ${text === 'Search' || text === 'Show more' ? 'allow' : ''}`} onClick={click}>
    {text === 'Search' && (
    <div className="search-icon">
      <SearchIcon />
    </div>
    )}
    {t(text)}
  </button>
  );
};

export default Button;

Button.propTypes = {
  btnClass: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  click: PropTypes.func,
};

Button.defaultProps = {
  click: mockFunc,
};
