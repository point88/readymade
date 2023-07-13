import { BenefitCards } from '../../Services/constants/LandingPage'
import { BenefitCard } from '../../Components/Cards/LandingPage'
import LiveImage from '../../Assests/Images/life.png'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'
export default function SectionBenefits() {
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  return (
    <div
      dir={lng ? 'ltr' : 'rtl'}
      className={
        'mt-[35px] sm:mt-[53px] xl:mt-[111px] w-full bg-lightgray flex ' +
        (lng ? 'font-[poppins]' : 'font-[almarai]')
      }
    >
      <div className="pt-[45px] sm:pt-[53px] xl:pt-[72px]  px-[22.69px] sm:px-[40px] sm:pl-[40.89px] xl:pl-[93px] w-full xl:pr-[88px]">
        <div className="w-[90%] mb:w-[270px] sm:w-[419px] xl:w-[821px] leading-[30px] sm:leading-[37.5px] xl:leading-[73.5px] text-[20px] sm:text-[25px] xl:text-[49px] text-darkblack font-bold">
          {t('benefitstitle')}
        </div>

        <div
          className={
            'flex flex-col xl:flex-row-reverse justify-between items-start w-full gap-y-[24.43px] sm:gap-y-[50px] sm:nt-[2px] mt-[8px] ' +
            (lng ? 'sm:pr-[15px] xl:pr-[24px]' : 'sm:pl-[15px] xl:pl-[24px]')
          }
        >
          <div className="xl:w-[653px] xl:h-[368px] sm:w-[576px] sm:h-[324px] mb:w-[318px] w-[100%] mb:h-[180px] h-[130px] xl:m-0 m-auto">
            <div className="relative w-full h-full sm:mt-[17px] xl:mt-[103px]">
              <div
                className={
                  'absolute -top-[7px] sm:-top-[14px] xl:-top-[20px] xl:w-[72px] xl:h-[94px] sm:w-[62px] sm:h-[81px] w-[35px] h-[45px] bg-lightyellow1 ' +
                  (lng
                    ? '-right-[7px] sm:-right-[14px] xl:-right-[24px]'
                    : '-left-[7px] sm:-left-[14px] xl:-left-[24px]')
                }
              />
              <div
                className={
                  'absolute -bottom-[9px] sm:-bottom-[12px] xl:-bottom-[23px] xl:w-[72px] xl:h-[94px] sm:w-[62px] sm:h-[81px] w-[35px] h-[45px] bg-darkgreen1 ' +
                  (lng
                    ? 'left-[7px]  sm:left-[24px] xl:left-[20px]'
                    : 'right-[7px]  sm:right-[24px] xl:right-[20px]')
                }
              />
              <img
                className="absolute top-0 left-0 w-full h-full"
                src={LiveImage}
                alt=""
              />
            </div>
          </div>
          <div className={lng ? 'font-[poppins]' : 'font-[almarai]'}>
            <div className="sm:pt-[38px] pb-[14px] flex flex-col xl:gap-y-[41px] sm:gap-y-[24px] gap-y-[13px]">
              {BenefitCards.map((CardData, index) => (
                <div key={index}>
                  <BenefitCard
                    icon={CardData.icon}
                    title={t(CardData.title)}
                    subTitle={t(CardData.subTitle)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
