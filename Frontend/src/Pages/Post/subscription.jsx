import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import i18n from '../../i18n'
import GoldIcon from '../../Assests/Images/gold-bar.svg'
import SilverIcon from '../../Assests/Images/success.svg'
import NormalIcon from '../../Assests/Images/startup.svg'
import CheckIcon from '../../Assests/Images/checking.svg'
import CloseIcon from '../../Assests/Images/close.svg'

const SubscriptPage = () => {
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  const packageList = [
    { id: 0, name: t('subscript.month12') },
    { id: 1, name: t('subscript.month36') },
  ]
  const mockdata = [
    {
      icon: GoldIcon,
      icondescription: t('subscript.gold'),
      description: t('subscript.goldbio'),
      select: [1, 1, 1, 1, 1, 1],
    },
    {
      icon: SilverIcon,
      icondescription: t('subscript.silver'),
      description: t('subscript.silverbio'),
      select: [1, 1, 1, 1, 0, 0],
    },
    {
      icon: NormalIcon,
      icondescription: t('subscript.normal'),
      description: t('subscript.normalbio'),
      select: [1, 1, 1, 0, 0, 0],
    },
  ]
  const [packageDuration, setPackageDuration] = useState(0)
  // const [packageType, setPackagetType] = useState()

  return (
    <div className="p-20 bg-bgd">
      <div className="flex items-center justify-between">
        <div className="flex gap-10">
          {packageList.map((item) => (
            <div
              className={`text-[19px] px-2 pb-1 cursor-pointer ${
                item.id === packageDuration
                  ? ' border-b-[3px] border-yellow'
                  : ''
              }`}
              key={item.id}
              onClick={() => setPackageDuration(item.id)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="text-[33px] font-bold">{t('subscript.title')}</div>
      </div>
      <div className="text-base text-right max-w-[850px] float-right">
        {t('subscript.subtitle')}
      </div>
      <div className="flex gap-20 w-full">
        {mockdata.map((item, key) => (
          <div
            className={`${
              key === 0 ? 'mt-[64px]' : key === 1 ? 'mt-[128px]' : 'mt-[194px]'
            } rounded-full w-1/3 border h-[825px] border-yellow bg-white flex flex-col items-center justify-center p-5 text-center relative`}
            key={key}
          >
            <div
              className={`bg-brown w-64 h-64 rounded-full flex flex-col items-center justify-center mt-[-112px]`}
              key={item.description}
            >
              <img src={item.icon} alt={item.icondescription} />
              <div className="text-[33px] font-bold text-yellow">
                {item.icondescription}
              </div>
            </div>
            <div className="text-base mt-5">{item.description}</div>
            <div className="mt-5">
              {item?.select.map((e, index) => (
                <div
                  className="flex items-center justify-center mt-10"
                  key={index}
                >
                  <img
                    src={e === 1 ? CheckIcon : CloseIcon}
                    alt={`Icon-${index}`}
                  />
                  <div className="text-[23px] ml-5">
                    {t('subscript.benefit')} - {index + 1}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-yellow text-center text-[25px] font-bold text-darkgreen px-8 py-3 rounded-full absolute -bottom-2 cursor-pointer">
              Subscribe
            </div>
          </div>
        ))}
      </div>
      <div className="text-[33px] font-bold">{t('subscript.title')}</div>
    </div>
  )
}

export default SubscriptPage
