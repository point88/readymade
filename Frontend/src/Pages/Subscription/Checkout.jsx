import { useState } from "react";
import Radio from "../../Components/Radio";
import styles from "./Checkout.module.css";
import { useRef } from "react";
import VisaIcon from "../../Assests/Images/visa.svg";
import MatercardIcon from "../../Assests/Images/mastercard.svg";
import PaypalIcon from "../../Assests/Images/paypal.svg";
import InsuranceIcon from "../../Assests/Images/insurance-65.svg";
import TargetIcon from "../../Assests/Images/target-65.svg";
import CheckoutSummary from "./CheckoutSummary";
import { useTranslation } from "react-i18next";
import i18n from '../../i18n'

const Checkout = ({ packageData, packageDuration }) => {
  const { t } = useTranslation()

  const dir = i18n.language === 'en' ? 'ltr' : 'rtl'

  const INPUTS = [
    { name: "cardNumber", label: t('subscription.cardNumber') },
    { name: "expiryDate", label: t('subscription.expiryDate'), placeholder: "MM / YY" },
    { name: "cardholderName", label: t('subscription.cardholderName') },
    { name: "cvv", label: t('subscription.cvv') },
  ];
  
  const BENEFITS = [
    {
      icon: InsuranceIcon,
      title: t('subscription.verifiedBadgeTitle'),
      content: t('subscription.verifiedBadgeDesc'),
    },
    {
      icon: TargetIcon,
      title: t('subscription.concentrateTitle'),
      content: t('subscription.concentrateDesc'),
    },
  ];

  const [paymentMethod, setPaymentMethod] = useState("card");

  const changePaymentMethod = (newVal) => {
    if (paymentMethod === newVal) return;
    setPaymentMethod(newVal);
  };

  const cardInputs = useRef({
    cardNumber: "",
    expiryDate: "",
    cardholderName: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    cardInputs.current[e.target.name] = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "paypal") {
      console.log("Forward to paypal");
    } else if (paymentMethod === "card") {
      console.log("Pay with card");
      console.log("card details", cardInputs.current);
    }

    console.log("packageData", packageData);
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit} dir={dir}>
      <h3 className={styles.heading}>{t('subscription.addPaymentMethod')}</h3>

      <div className={styles.grid}>
        <div className={styles.box}>
          <div
            className={styles.paymentMethod}
            onClick={() => changePaymentMethod("card")}
            data-active={paymentMethod === "card"}
          >
            <div className={styles.paymentMethodHeader}>
              <Radio
                name="payment-method"
                label={t('subscription.cardTitle')}
                className={styles.radio}
                checked={paymentMethod === "card"}
              />

              <span className={styles.headerSubtitle}>
                {t('subscription.cardNote')}
              </span>
            </div>

            <div className={styles.inputs}>
              {INPUTS.map((input, idx) => (
                <div className={styles.inputGroup} key={idx}>
                  <label className={styles.inputLabel}>{input.label}:</label>
                  <input
                    className={styles.input}
                    type="text"
                    name={input.name}
                    value={cardInputs[input.name]}
                    onChange={handleInputChange}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
            </div>

            <div className={styles.showcaseCards}>
              <img className={styles.showcaseCard} src={VisaIcon} alt="" />
              <img className={styles.showcaseCard} src={MatercardIcon} alt="" />
            </div>
          </div>

          <div
            className={styles.paymentMethod}
            onClick={() => changePaymentMethod("paypal")}
            data-active={paymentMethod === "paypal"}
          >
            <div className={styles.paymentMethodHeader}>
              <Radio
                name="payment-method"
                label={t('subscription.paypal')}
                className={styles.radio}
                checked={paymentMethod === "paypal"}
              />

              <img src={PaypalIcon} alt="" />
            </div>
          </div>

          <div className={styles.benefits}>
            <div className={styles.benefitsHeader}>
              {t('subscription.verifiedPaymentBenefits')}
            </div>

            <div className={styles.benefitsBody}>
              {BENEFITS.map((benefit, idx) => (
                <div key={idx} className={styles.benefit}>
                  <img
                    src={benefit.icon}
                    alt=""
                    className={styles[`benefitImg${idx + 1}`]}
                  />

                  <div>
                    <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                    <p className={styles.benefitContent}>{benefit.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CheckoutSummary
          className={styles.box}
          packageData={packageData}
          packageDuration={packageDuration}
        />
      </div>
    </form>
  );
};

export default Checkout;
