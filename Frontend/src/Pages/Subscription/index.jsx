import Package from './Package'
import styles from './index.module.css'
import { useState } from 'react'
import PackageView from './PackageView'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import GoldIcon from '../../Assests/Images/gold-bar.svg'
import SilverIcon from '../../Assests/Images/success.svg'
import NormalIcon from '../../Assests/Images/startup.svg'
import i18n from '../../i18n'

const SubscriptionPage = () => {
  const { t } = useTranslation()

  const dir = i18n.language === 'en' ? 'ltr' : 'rtl'

  const packagesData = [
    {
      ...t('subscription.gold', { returnObjects: true }),
      excludedBenefits: [],
      icon: GoldIcon,
      isUp: true,
      price: {
        monthly: 12,
        yearly: 80,
      },
      style: {
        titleColor: '#F8D850',
        lgIconWidth: 104,
        smIconWidth: 45,
      },
    },
    {
      ...t('subscription.silver', { returnObjects: true }),
      excludedBenefits: [4, 5],
      icon: SilverIcon,
      price: {
        monthly: 10,
        yearly: 70,
      },
      style: {
        titleColor: '#B2B2AF',
        lgIconWidth: 80,
        smIconWidth: 30,
      },
    },
    {
      ...t('subscription.classic', { returnObjects: true }),
      excludedBenefits: [3, 4, 5],
      icon: NormalIcon,
      price: {
        monthly: 8,
        yearly: 60,
      },
      style: {
        titleColor: '#CD7F32',
        lgIconWidth: 94,
        smIconWidth: 40,
      },
    },
    {
      ...t('subscription.platinum', { returnObjects: true }),
      excludedBenefits: [],
      icon: GoldIcon,
      isUp: true,
      price: {
        monthly: 14,
        yearly: 90,
      },
      style: {
        titleColor: '#CD7F32',
        lgIconWidth: 104,
        smIconWidth: 45,
      },
    },
  ]

  const packageDurations = [
    { type: 'monthly', label: t('subscription.1Month') },
    { type: 'yearly', label: t('subscription.12Month') },
  ]

  const [packageDuration, setPackageDuration] = useState(
    packageDurations[0].type,
  )

  const [selectedPkgIdx, setSelectedPkgIdx] = useState(null)

  return (
    <div className={styles.page} dir={dir}>
      {console.log('selectePkgIdx: ', selectedPkgIdx)}
      <div className={styles.container}>
        <div className="h-[69px] mb:h-[69px] sm:h-[100px] xl:h-[142px]" />

        <div className={styles.durationBtns}>
          {packageDurations.map((duration) => (
            <div
              className={styles.durationBtn}
              key={duration.type}
              onClick={() => setPackageDuration(duration.type)}
              data-active={duration.type === packageDuration}
            >
              {duration.label}
            </div>
          ))}
        </div>

        <div className={styles.info}>
          <h3 className={styles.title}>{t(`subscription.heading`)}</h3>

          <p className={styles.desc}>{t(`subscription.description`)}</p>
        </div>

        <div className={styles.packages}>
          {packagesData.map((packageData, idx) => (
            <Package
              key={idx}
              packageData={packageData}
              onClickSubscribe={() => setSelectedPkgIdx(idx)}
            />
          ))}
        </div>
      </div>

      {typeof selectedPkgIdx === 'number' && (
        <PackageView
          packageData={packagesData[selectedPkgIdx]}
          packageDuration={packageDuration}
          setPackageDuration={setPackageDuration}
          selectedPkgIdx={selectedPkgIdx}
        />
      )}

      <div className={styles.footerSection}>
        {t('subscription.achieveSuccess')}
      </div>
    </div>
  )
}

export default SubscriptionPage
