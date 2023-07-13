import { FeedbackCard, Avatars } from '../../Components/Cards/LandingPage'
import {
  FeedbackCards,
  FeedbackSubTitle,
  FeedbackAvatars,
} from '../../Services/constants/LandingPage'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'

export default function SectionFeedback() {
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false

  return (
    <div className="flex justify-between w-full border-y-[1px] border-lightyellow bg-lightgray3 px-[35px] sm:px-[97px] py-[38px] sm:py-[50px] pt-[56px] sm:pt-[67px] xl:pt-[94px]">
      <div
        dir={lng ? 'ltr' : 'rtl'}
        className="w-full flex justify-between items-center"
      >
        <div dir="ltr" className="hidden xl:flex justify-between w-[675px]">
          {FeedbackCards.map((CardData, index) => (
            <div key={index}>
              <FeedbackCard
                content={CardData.content}
                avatar={CardData.avatar}
                name={CardData.name}
              />
            </div>
          ))}
        </div>
        <div
          dir="ltr"
          className="w-full xl:w-[500px] 2xl:w-[650px] flex justify-center items-center xl:px-[101px]"
        >
          <div
            className={`${
              lng ? 'font-[poppins]' : 'font-[Almarai]'
            } w-full flex xl:block flex-col xl:flex-none items-center xl:items-start`}
          >
            <p
              className={`text-lightgreen1 text-[23px] sm:text-[30px] text-center ${
                lng ? 'xl:text-left' : 'xl:text-right'
              } ${
                !lng ? 'sm:w-full' : 'sm:w-[428px]'
              } xl:text-left sm:py-[15px] xl:py-[12px] font-bold sm:font-[400] sm:mb-[7px]`}
            >
              {t('feedbacktitle')}
            </p>
            <p
              className={`text-gray text-[14px] sm:text-[16px] text-center ${
                lng ? 'xl:text-left' : 'xl:text-right'
              } ${!lng ? 'sm:w-full' : 'sm:w-[428px]'}`}
            >
              {FeedbackSubTitle.en}
            </p>
            <div className="block sm:hidden my-[25px]">
              <FeedbackCard
                content={FeedbackCards[0].content}
                avatar={FeedbackCards[0].avatar}
                name={FeedbackCards[0].name}
              />
            </div>
            <div className="hidden sm:flex xl:hidden justify-between w-[614px] my-[30px]">
              {FeedbackCards.map((CardData, index) => (
                <div key={index}>
                  <FeedbackCard
                    content={CardData.content}
                    avatar={CardData.avatar}
                    name={CardData.name}
                  />
                </div>
              ))}
            </div>
            <div dir={lng ? 'ltr' : 'rtl'} className="mt-[0px] xl:mt-[65px]">
              <Avatars number={2500} avatars={FeedbackAvatars} />
            </div>
            <div className="block sm:hidden mt-[25px]">
              <FeedbackCard
                content={FeedbackCards[1].content}
                avatar={FeedbackCards[1].avatar}
                name={FeedbackCards[1].name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
