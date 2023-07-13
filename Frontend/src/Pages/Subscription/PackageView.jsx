import { useState } from 'react'
import styles from './PackageView.module.css'
import StopwatchIcon from '../../Assests/Images/stopwatch-65.svg'
import InsuranceIcon from '../../Assests/Images/insurance-65.svg'
import UnitedIcon from '../../Assests/Images/united-65.svg'
import HourGlassIcon from '../../Assests/Images/hourglass-65.svg'
import TargetIcon from '../../Assests/Images/target-65.svg'
import ManFreelancerImg from '../../Assests/Images/man-freelancer.svg'
import Checkout from '../Post/Checkout'
import PostService from '../../Services/post'
import UserService from '../../Services/profile'
import {
  SubscriptionType,
  callbackURL,
} from '../../Services/constants/accountType'
import { parseLineBreaks } from '../../Utils/parseLineBreaks'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'
import { toast } from 'react-toast'

const featuresIcons = [
  StopwatchIcon,
  InsuranceIcon,
  UnitedIcon,
  HourGlassIcon,
  TargetIcon,
]

const PackageView = ({
  packageData,
  packageDuration,
  setPackageDuration,
  selectedPkgIdx,
}) => {
  const { t } = useTranslation()
  const dir = i18n.language === 'en' ? 'ltr' : 'rtl'
  const [amount, setAmount] = useState(packageData.price.monthly.toFixed(2))
  const handlePackageType = (duration) => {
    setPackageDuration(duration)
    setAmount(
      duration === 'monthly'
        ? packageData.price.monthly.toFixed(2)
        : packageData.price.yearly.toFixed(2),
    )
  }
  const handleSubmit = async (data) => {
    const payload = {
      amount: amount,
      currency: 'USD',
      cardholder_name: data.cardholderName,
      card_number: data.cardNumber.replace(/ /g, ''),
      cvc: data.cvc,
      expire_month: data.date.split('/')[0],
      expire_year: '20' + data.date.split('/')[1],
      callback_url: callbackURL,
    }
    const sub_type = selectedPkgIdx === 3 ? 1 : selectedPkgIdx + 1
    try {
      await PostService.createPayment(payload)
      UserService.setSubscription({
        subscription_type: SubscriptionType[sub_type],
        subscription_expire_at: duration === 'monthly' ? 1 : 12,
      })
    } catch (error) {
      toast.error('create payment failed')
      console.error(error)
    }
  }

  return (
    <div className={styles.root} dir={dir}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerWrapper}>
            <h3 className={styles.heading}>
              {t('subscription.subscriptionPackage')}{' '}
              <span style={{ color: packageData.style.titleColor }}>
                {packageData.title}
              </span>{' '}
              {t('appNameEn')}
            </h3>

            <img
              className={styles.headingIcon}
              src={packageData.icon}
              alt=""
              style={{ width: packageData.style.smIconWidth }}
            />
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.note}>{parseLineBreaks(packageData.note)}</div>

        <h2 className={styles.title}>{t('subscription.packageFeatures')}</h2>

        <div className={styles.featuresSection}>
          <div>
            {packageData.features.map((featureText, idx) => (
              <div key={idx} className={styles.feature}>
                <img
                  className={styles.featureImg}
                  src={featuresIcons[idx]}
                  alt=""
                />

                <div className={styles.featureText}>{featureText}</div>
              </div>
            ))}
          </div>

          <div className={styles.featuresImgWrapper}>
            <img className={styles.featuresImg} src={ManFreelancerImg} alt="" />
          </div>
        </div>
      </div>

      <div className={styles.durationsSection}>
        <button
          className={styles.durationBtn}
          data-active={packageDuration === 'monthly'}
          onClick={() => handlePackageType('monthly')}
        >
          <span>${packageData.price.monthly.toFixed(2)}</span>
          <span>{t('subscription.monthly')}</span>
        </button>

        <button
          className={styles.durationBtn}
          data-active={packageDuration === 'yearly'}
          onClick={() => handlePackageType('yearly')}
        >
          <span>${packageData.price.yearly.toFixed(2)}</span>
          <span>{t('subscription.yearly')}</span>
        </button>
      </div>

      <div className={clsx(styles.container, styles.noSmContainer)}>
        <Checkout
          onSubmit={handleSubmit}
          paymentAmount={amount}
          currencyType={'USD'}
        />
        {/* <Checkout packageData={packageData} packageDuration={packageDuration} /> */}
      </div>
    </div>
  )
}

export default PackageView
