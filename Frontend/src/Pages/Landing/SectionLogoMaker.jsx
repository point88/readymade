import LogoMakerImage from '../../Assests/Images/logoMaker.png'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'

export default function SectionLogoMaker() {
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false

  return (
    <div className="py-[34px] xl:py-[53.9px]">
      <div
        className="border-y-0 sm:border-y-[3px] xl:border-y-[5px] sm:border-lightyellow bg-darkgray overflow-hidden flex flex-wrap justify-between sm:h-[297px] xl:h-[395px] relative"
        dir={lng ? 'ltr' : 'rtl'}
      >
        <div
          className={`text-white ${
            lng
              ? 'font-[poppins] sm:pl-[43px] xl:pl-[113px] left-0'
              : 'font-[Almarai] sm:pr-[43px] xl:pr-[88px] right-0'
          } flex flex-col justify-around h-full pt-[15px] pb-[15px] sm:pt-[18px] sm:pb-[27px] xl:pt-[52px] xl:pb-[41px]`}
        >
          <p
            className={`text-[24px] sm:text-[29px] xl:text-[39px] font-bold text-center ${
              lng
                ? 'sm:text-left w-full sm:w-[220px] xl:w-full'
                : 'sm:text-right w-full sm:w-[240px] xl:w-full'
            } m-0 mb-[8px] sm:mb-0`}
          >
            {t('logomakertitle')}
          </p>
          <div className="flex sm:hidden justify-center border-y-[3px] border-lightyellow">
            <img src={LogoMakerImage} alt="" className="w-[80%] h-auto" />
          </div>
          <div
            className={`text-[16px] xl:text-[22px] text-center ${
              lng ? 'sm:text-left' : 'sm:text-right'
            } w-full sm:w-[222px] xl:w-[300px] mt-[26px] mb-[18px] sm:mt-[24px] sm:mb-[21px] xl:mt-[9px] xl:mb-[32px] flex sm:block flex-col sm:flex-none items-center sm:items-start`}
          >
            <p
              dir={lng ? 'ltr' : 'ltr'}
              className={`${lng ? 'w-full sm:w-[266px]' : 'w-[170px]'}`}
            >
              {t('logomakersubtitle1')}
            </p>
            <p className={`${lng ? 'sm:w-[304px]' : 'sm:w-[404px]'}`}>
              {t('logomakersubtitle2')}
            </p>
            <p className="sm:w-[228px]">{t('logomakersubtitle3')}</p>
          </div>
          <div className="w-full justify-center sm:justify-start flex">
            <p
              className={`px-[10px] py-[9px] xl:px-[16px] xl:py-[18px] rounded-[10px] bg-green select-none cursor-pointer text-white text-[12px] xl:text-[24px]  text-center ${
                lng
                  ? 'sm:text-left font-[poppins] w-[max-content]'
                  : 'sm:text-right font-[Almarai] min-w-[132px]'
              } flex items-center justify-center`}
            >
              {t('trybuttontext')}
            </p>
          </div>
        </div>
        <img
          src={LogoMakerImage}
          alt=""
          className={`h-[100%] hidden sm:block absolute ${
            lng ? 'right-4' : 'left-4 transform scale-x-[-1]'
          }`}
        />
      </div>
    </div>
  )
}
