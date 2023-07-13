import { CategoryCards } from '../../Services/constants/LandingPage'
import { CategoryCard } from '../../Components/Cards/LandingPage'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'

export default function SectionCategory() {
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  return (
    <div className="px-[29px] xl:px-[92px] py-[38px] sm:pt-[70px] xl:pt-[38px] sm:pb-[42px] xl:pb-[83px] flex justify-center bg-lightgray1">
      <div
        className={
          'text-center w-full ' + (lng ? 'font-[poppins]' : 'font-[almarai]')
        }
      >
        <div className="flex flex-col items-center">
          <div className="text-darkgreen2 text-[23px] sm:text-[37px] font-bold">
            {t('categorytitle')}
          </div>
          <div className="pt-[5px] sm:pt-[22px] max-w-[262px] sm:max-w-[445px] xl:max-w-[498px] text-gray text-[13px] sm:text-[18px]">
            {t('categorysubtitle')}
          </div>
        </div>
        <div className="pt-[19px] sm:pt-[31px] xl:pt-[42px] flex flex-wrap gap-x-[35px] gap-y-[28px] sm:gap-y-[39px] justify-center xl:justify-between w-full">
          {CategoryCards.map((CardData, index) => (
            <div
              key={index}
              className="w-[92%] mb:w-[300px] sm:w-[45%] lg:w-[30%] xl:w-[20%] 2xl:w-[23%]"
            >
              <CategoryCard
                icon={CardData.icon}
                title={t(CardData.title)}
                content={CardData.content}
                status={CardData.status}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
