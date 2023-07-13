import styles from "./Package.module.css";
import CheckIcon from "../../Assests/Images/checking.svg";
import CloseIcon from "../../Assests/Images/close.svg";
import { useTranslation } from "react-i18next";
import i18n from '../../i18n'

const Package = ({ packageData, onClickSubscribe }) => {
  const { t } = useTranslation()

  const dir = i18n.language === 'en' ? 'ltr' : 'rtl'
  
  return (
    <div className={styles.root} dir={dir}>
      <div className={styles.package} data-is-up={packageData.isUp}>
        <div className={styles.packageHeader}>
          <img
            className={styles.packageIcon}
            src={packageData.icon}
            style={{ width: packageData.style.lgIconWidth }}
          />
          <h3 className={styles.packageTitle}>{packageData.title}</h3>
        </div>

        <div className={styles.packageDesc}>
          {t('subscription.packageDesc')}
        </div>

        <div className={styles.benefits}>
          {packageData.benefits.map((benefitText, idx) => (
            <div className={styles.benefit} key={idx}>
              <img
                className={styles.benefitIcon}
                src={packageData.excludedBenefits.includes(idx) ? CloseIcon : CheckIcon}
              />
              <span className={styles.benefitText}>{benefitText}</span>
            </div>
          ))}
        </div>

        <button className={styles.subscribeBtn} onClick={onClickSubscribe}>
          {t('subscription.subscribe')}
        </button>
      </div>
    </div>
  );
};

export default Package;
