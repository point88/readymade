import { useTranslation } from "react-i18next";
import styles from "./CheckoutSummary.module.css";
import clsx from "clsx";
import i18n from '../../i18n'

const CheckoutSummary = ({ className, packageData, packageDuration }) => {
  const { t } = useTranslation();

  const dir = i18n.language === 'en' ? 'ltr' : 'rtl'

  const packagePrice = packageData.price[packageDuration];
  const processingFee = packagePrice * 0.03;
  const totalPrice = packagePrice + processingFee;

  return (
    <div className={clsx(styles.root, className)} dir={dir}>
      <div className={styles.section1}>
        <div className={styles.row}>
          <span className={styles.heading1}>{t("subscription.item")}</span>
          <span className={styles.heading1}>{t("subscription.amount")}</span>
        </div>

        <div className={styles.separator} />

        <div className={styles.row}>
          <span className={styles.heading3}>
            {t("subscription.recruiterUpgrade")}
          </span>
          <span className={styles.heading2}>
            ${packagePrice.toFixed(2)} USD
          </span>
        </div>

        <span className={styles.heading5}>
          {t("subscription.projectUpgrade")}
        </span>
      </div>

      <div className={styles.section2}>
        <div className={styles.row} style={{ paddingBottom: 6 }}>
          <span className={styles.heading4}>
            {t("subscription.processingFee")}
          </span>
          <span className={styles.heading2}>
            ${processingFee.toFixed(2)} USD
          </span>
        </div>

        <div className={styles.separator} />

        <div className={styles.row}>
          <span className={styles.heading1}>{t("subscription.total")}</span>
          <span className={styles.heading2}>${totalPrice.toFixed(2)} USD</span>
        </div>
      </div>

      <button type="submit" className={styles.checkoutBtn}>
        {t("subscription.confirmAndPay")} ${totalPrice.toFixed(2)} USD
      </button>

      <p className={styles.note}>{t("subscription.paymentAgreeNote")}</p>
    </div>
  );
};

export default CheckoutSummary;
