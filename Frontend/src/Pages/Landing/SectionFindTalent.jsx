import WorkingFromHomeImage from '../../Assests/Images/workingFromHome.png'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'

export default function SectionFindTalent() {
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  return (
    <div
      dir={lng ? 'ltr' : 'rtl'}
      className={
        'py-[11px] sm:py-[17px] xl:py-[65px] bg-white xl:bg-bgd ' +
        (lng ? 'font-[Poppins]' : 'font-[almarai]')
      }
    >
      <div className="relative">
        <div className="z-[5000] absolute pt-[19px] sm:pt-[26px] xl:pt-[90px] pb-[50px] px-[15px] sm:px-[40px] xl:px-[91px] flex flex-col justify-start xl:justify-between h-full">
          <div className="text-[14px] sm:text-[28px] xl:text-[45px] text-green  font-bold">
            <span>{t('findTalenttitle1')}</span>
            <br className="hidden mb:block" />
            <span>{t('findTalenttitle2')}</span>
          </div>
          <div className="pt-[17px] sm:pt-[33px]">
            <div className="w-[62px] sm:w-[110px] xl:w-[158px] p-[7px] sm:p-[13px] xl:py-[15px] rounded-[5px] sm:rounded-[10px] bg-lightgreen text-white text-center text-[7px] sm:text-[12px] xl:text-[18px] select-none cursor-pointer ">
              {t('getbuttontext')}
            </div>
          </div>
        </div>
        <img
          src={WorkingFromHomeImage}
          alt="WorkingFromHomeImage"
          className={
            'w-full transform  ' + (!lng ? 'scale-x-[-1]' : 'scale-x-[1]')
          }
        />
      </div>
    </div>
  )
}
