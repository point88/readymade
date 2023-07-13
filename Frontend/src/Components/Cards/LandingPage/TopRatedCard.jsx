import RatingStar from '../../RatingStar'
import i18n from '../../../i18n'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@mui/material'

export default function TopRatedCard({
  image,
  rating,
  title,
  name,
  hourlyRate,
  bio,
  skills,
}) {
  const lng = i18n.language === 'en' ? true : false
  const { t } = useTranslation()
  return (
    <div className="w-full relative">
      <div className="flex justify-center">
        {!!image ? (
          <img
            src={image}
            alt={name}
            className="w-[114px] h-[114px] xl:w-[163px] xl:h-[163px] rounded-full border-[3px] border-lightyellow mb-[-81px]"
          />
        ) : (
          <Avatar className="w-[114px] h-[114px] xl:w-[163px] xl:h-[163px]  mb-[-81px] border-[3px] border-lightyellow" />
        )}
      </div>
      <div className="border-[3px] rounded-[10px] border-lightyellow flex flex-col items-center pt-[87px]">
        <RatingStar value={rating} />
        <div
          dir={lng ? 'ltr' : 'rtl'}
          className="flex w-full h-[47px] xl:h-[65px] mt-[14px]"
        >
          <div
            className={
              'w-3/5 border-[1px] border-lightyellow1 pl-[27px] text-blue flex flex-col justify-center ' +
              (lng ? 'rounded-l-full ml-[13px] ' : 'rounded-r-full mr-[13px] ')
            }
          >
            <div
              className={
                'text-[8px] mb:text-[13px] xl:text-[16px] ' +
                (lng ? 'font-[poppins]' : 'font-[almarai] text-right mr-[30px]')
              }
            >
              {title}
            </div>
            <div
              dir="ltr"
              className={
                'text-[10px] mb:text-[15px] xl:text-[22px] font-bold ' +
                (lng ? 'text-left' : 'text-right mr-[30px]')
              }
            >
              {name}
            </div>
          </div>
          <div
            className={
              'w-2/5  bg-darkgreen text-white font-[poppins] flex flex-col justify-center ' +
              (lng
                ? 'rounded-r-full mr-[13px] text-center'
                : 'rounded-l-full ml-[13px] text-right pr-[20px]')
            }
          >
            <div
              className={
                'text-[8px] mb:text-[13px] xl:text-[16px] ' +
                (lng ? 'font-[poppins]' : 'font-[almarai]')
              }
            >
              {t('hourlystarting')}
            </div>
            <div
              dir="ltr"
              className="text-[10px] mb:text-[13px] sm:text-[15px] font-bold"
            >
              {hourlyRate.toFixed(2)}$&nbsp;/hr
            </div>
          </div>
        </div>
        <div
          dir={lng ? 'ltr' : 'rtl'}
          className="mt-[19px] bg-lightyellow w-full h-[30px] flex items-center"
        >
          <div
            className={
              'text-[10px] xl:text-[16px] text-darkblack underline line-clamp-1 ml-[15px] ' +
              (lng ? 'font-[poppins]' : 'font-[almarai]')
            }
          >
            {bio}
          </div>
        </div>
        <div className="h-[80px] py-[9px] px-[11px] xl:py-[21px] xl:px-[13px] flex flex-wrap gap-x-[7px] gap-y-[9px] bg-white rounded-b-[10px]">
          {skills.map((text, index) => (
            <div
              key={index}
              className="bg-lightgray1 rounded-[50px] px-[6px] py-[1px]"
            >
              <div className="font-[helvetica neue] text-[8px] xl:text-[13px] text-lightgray2">
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
