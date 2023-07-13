import clsx from "clsx";
import styles from "./index.module.css";
import i18n from "../../i18n";

const Radio = ({ label, className, style, onChange, ...inputProps }) => {
  const dir = i18n.language === "en" ? "ltr" : "rtl";

  return (
    <label className={clsx(styles.radioLabel, className)} style={style} dir={dir}>
      <input
        type="radio"
        className={styles.radioInput}
        {...inputProps}
        onChange={(e) => (onChange ? onChange(e) : null)}
      />
      <span className={styles.checkMark} />
      <span>{label}</span>
    </label>
  );
};

export default Radio;
