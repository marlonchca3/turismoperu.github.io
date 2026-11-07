import { DEFAULT_LANGUAGE_CONTEXT, LanguageContext } from '../../i18n/LanguageContext';
import React from 'react';
import './Newsletter.scss';
import Button from '../../components/button/Button';
import { ReactComponent as Form } from '../../assets/svgs/details.svg';
import { ReactComponent as Separator } from '../../assets/svgs/separators/stroke.svg';

class Newsletter extends React.Component {
  static contextType = LanguageContext;

  state ={
    userInput: '',
  }

  handleInput = (e) => {
    const { value } = e.target;

    this.setState({ userInput: value });
  }

  handleSubmit = () => {
    const { userInput } = this.state;
    window.alert(userInput);
    this.setState({ userInput: '' });
  }

  render() {
    const { t = DEFAULT_LANGUAGE_CONTEXT.t } = this.context;
    const { userInput } = this.state;
    return (
      <div className="newsletter-container">
        <div className="separator">
          <Separator />
        </div>
        <div className="sign">
          <div className="img-wrapper">
            <img
              src={`${process.env.PUBLIC_URL}/images/ica.jpg`}
              alt={t("Oasis de Huacachina, Ica, Perú")}
            />
          </div>
          <div className="form-wrapper">
            <span className="title">{t("Tu próxima aventura te espera")}</span>
            <span className="description">
              {t(`Suscríbete a nuestro boletín y descubre experiencias de viaje por el Perú
              que querrás vivir.`)}
            </span>
            <form>
              <div className="input-wrapper">
                <label htmlFor="email">
                  <input type="email" id="email" value={userInput} placeholder={t("Tu correo electrónico")} onChange={this.handleInput} />
                  <div className="details-label">
                    <Form />
                  </div>
                </label>
              </div>
              <Button btnClass="bg-blue" text="Inspírate" click={this.handleSubmit} />
            </form>
          </div>
        </div>
        <span className="privacy">{t("Al suscribirte, aceptas recibir correos promocionales. Puedes darte de baja cuando quieras. Para más información, consulta nuestra")}{t(' ')}
          <a href="www.privacy" className="link">{t("Política de privacidad")}</a>{t(".")}</span>
      </div>
    );
  }
}
export default Newsletter;
