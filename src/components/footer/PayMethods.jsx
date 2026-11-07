import { useTranslation } from '../../i18n/LanguageContext';
import React from 'react';
import './PayMethods.scss';
import {
  amex,
  applePay,
  bancontact,
  discover,
  googlePay,
  jcb,
  klarna,
  maestro,
  mastercard,
  paypal,
  sofort,
  visa,
} from '../../constants/imgs/payment';

const PayMethods = () => {
  const { t } = useTranslation();
  return (
<div className="pay-methods">
    <span>{t("Formas de pago")}</span>
    <div className="cards">
      <img src={paypal} alt={t("Paypal")} />
      <img src={mastercard} alt={t("MasterCard")} />
      <img src={visa} alt={t("Visa")} />
      <img src={maestro} alt={t("Maestro")} />
      <img src={amex} alt={t("Amex")} />
      <img src={bancontact} alt={t("Bancontact")} />
      <img src={jcb} alt={t("JCB")} />
      <img src={discover} alt={t("Discover")} />
      <img src={sofort} alt={t("Sofort")} />
      <img src={klarna} alt={t("Klarna")} />
      <img src={googlePay} alt={t("Google Pay")} />
      <img src={applePay} alt={t("Apple Pay")} />
    </div>
  </div>
  );
};

export default PayMethods;
