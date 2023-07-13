import { HelpCard } from '../../Components/Cards/LandingPage'
import CheckIcon from '../../Assests/Images/check.svg'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'

export default function SectionHelp() {
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  return (
    <div className="pt-[0px] sm:pt-[36px] xl:px-[97px] xl:pt-[84px] xl:pb-[57px] flex justify-center bg-lightgray1">
      <div
        dir={lng ? 'ltr' : 'rtl'}
        className="flex flex-col xl:flex-row justify-between items-center px-[16px] sm:px-[50px] xl:px-[10px] w-full"
      >
        <HelpCard />
        <div
          className={`${
            lng ? 'font-[poppins] xl:ml-[21px]' : 'font-[Almarai] xl:mr-[21px]'
          } w-full xl:w-[55%] max-w-[289px] sm:max-w-[550px] xl:max-w-[696px] flex flex-col mt-[85px] mb:mt-[79px] sm:mt-[141px] xl:mt-[128px]`}
        >
          <p
            className={`text-darkgreen2 text-[4vw] mb:text-[24px] sm:text-[33px] ${
              lng ? 'sm:text-left text-center ' : 'sm:text-right'
            } font-bold mb-[14px] sm:mb-[23px] xl:mb-[49px] sm:w-[457px] sm:ml-[14px] xl:ml-[0px]`}
          >
            {t('helptitle')}
          </p>
          <p
            className={`text-gray text-[12px] sm:text-[18px] px-0 sm:px-10 xl:px-0 ${
              lng ? 'sm:text-left text-center' : 'sm:text-right'
            } mb-[15px] sm:mb-[34px] xl:mb-[69px] w-[230px] sm:w-[418px] xl:w-[619px]`}
          >
            {t('helpsubtitle')}
          </p>
          <div className="flex flex-col sm:gap-x-[27px] justify-center sm:justify-start items-start w-full px-[0px] mb:px-[0px] xl:px-[0px]">
            <div className="flex gap-x-[19px] mb-[14px] sm:mb-[18px] items-center">
              <img
                src={CheckIcon}
                alt=""
                className="w-[10px] sm:w-[20px] h-[7px] sm:h-[18px]"
              />
              <p
                className={`text-darkblue text-[10px] sm:text-[21px] ${
                  lng ? 'sm:text-left' : 'sm:text-right'
                }`}
              >
                {t('helpcontent1')}
              </p>
            </div>
            <div className="flex gap-x-[19px] mb-[14px] sm:mb-[18px] items-center">
              <img
                src={CheckIcon}
                alt=""
                className="w-[10px] sm:w-[20px] h-[7px] sm:h-[18px]"
              />
              <p className="text-darkblue text-[10px] sm:text-[21px]">
                {t('helpcontent2')}
              </p>
            </div>
            <div className="flex gap-x-[19px] mb-[14px] sm:mb-[18px] items-center">
              <img
                src={CheckIcon}
                alt=""
                className="w-[10px] sm:w-[20px] h-[7px] sm:h-[18px]"
              />
              <p className="text-darkblue text-[10px] sm:text-[21px]">
                {t('helpcontent3')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
