import PromotePic from '../../Assests/Images/promote.png'
import LineRounded from '../../Assests/Images/round_line.svg'
import { SearchInput } from '../../Components/Inputs'
import FinanceIcon from '../../Assests/Images/finance.png'
import MarketingIcon from '../../Assests/Images/marketing.png'
import DesignerIcon from '../../Assests/Images/designer.png'
import SalesIcon from '../../Assests/Images/sales.png'
import IncreaseIcon from '../../Assests/Images/increase.png'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'
export default function SectionPromote() {
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  return (
    <div
      className={
        'mt-[69px] mb:mt-[69px] sm:mt-[100px] xl:mt-[142px] h-[300px] mb:h-[370px] sm:h-[400px] xl:h-[671px] w-full flex justify-end bg-lightyellow relative ' +
        (i18n.language === 'en' ? 'font-[Poppins]' : 'font-[Almarai]')
      }
    >
      <div
        className={
          'w-full z-[40] flex' +
          (lng
            ? ' mb:pl-[26px] sm:pl-[40.89px] xl:pl-[93px] pt-[35px] sm:pt-[52px] xl:pt-[102px]'
            : ' mb:pr-[26px] sm:pr-[40.89px] xl:pr-[93px] pt-[35px] sm:pt-[52px] xl:pt-[102px]')
        }
        dir={lng ? 'ltr' : 'rtl'}
      >
        <div className="h-full">
          <div
            className={
              'text-center w-[90%] m-auto mb:m-0 mb:w-[257px] text-[#333333] font-bold text-[20px] leading-[30px] mb:text-[26px] sm:text-[30px] xl:text-[55px]  mb:leading-[39px] sm:leading-[45px] xl:leading-[82.5px] sm:w-[296px] xl:w-[543px] uppercase ' +
              (lng ? 'mb:text-left' : 'mb:text-right')
            }
          >
            {t('promotesectiontitle1')}
          </div>
          <img
            src={LineRounded}
            alt="linerounded"
            className="xl:mt-[-20px] xl:w-[189px] sm:mb-[16px] sm:mt-[-10px] sm:w-[100px] mb:mt-[-10px]  mb:w-[90px] mb:mb-[22px] mt-[-10px]  w-[90px] mb-[22px] xl:mx-[160px] sm:mx-[90px] mx-[75px]"
          />
          <div
            className={
              'text-center m-auto mb:m-0  text-[10px] mb:text-[12px] sm:text-[14px] xl:text-[22px] mb:w-[113px] w-[80%] sm:w-[263px] xl:w-[558px] mb:leading-[18px] sm:leading-[21px] xl:leading-[33px] text-[#003049] ' +
              (lng ? 'mb:text-left' : 'mb:text-right')
            }
          >
            {t('promotesectiontitle2')}
          </div>
          <div className="xl:mt-[30.5px] sm:mt-[26px] mt-[36.12px]">
            <SearchInput />
          </div>
          <div className="hidden sm:flex flex-wrap text-[8px] sm:leading-[15px] xl:leading-[18px] sm:text-[10px] xl:text-[18px] text-[#003049] sm:mt-[9px] xl:mt-[36.5px] mb:mt-[23px] gap-[3px] xl:gap-[15px] items-center justify-center mb:justify-start">
            <span>{t('popular')}</span>
            <div className="flex items-center" dir="ltr">
              <Box
                component="img"
                src={FinanceIcon}
                className="w-[7px] sm:w-[8px] xl:w-[20px] h-[7px] sm:h-[10px] xl:h-[20px]"
              />
              <span className="ml-[8px]">{t('finance')}</span>
              <Box
                component="img"
                src={IncreaseIcon}
                className="opacity-[0.25] w-[10px] xl:w-[19px]"
              />
            </div>
            <div className="flex items-center" dir="ltr">
              <Box
                component="img"
                src={MarketingIcon}
                className="w-[7px] sm:w-[13px] xl:w-[25px] h-[7px] sm:h-[13px] xl:h-[25px]"
              />
              <span className="ml-[8px]">{t('marketing')}</span>
              <Box
                component="img"
                src={IncreaseIcon}
                className="opacity-[0.25] w-[10px] xl:w-[19px]"
              />
            </div>
            <div className="flex items-center" dir="ltr">
              <Box
                component="img"
                src={DesignerIcon}
                className="w-[7px] sm:w-[13px] xl:w-[25px] h-[7px] sm:h-[13px] xl:h-[25px]"
              />
              <span className="ml-[8px]">{t('designer')}</span>
              <Box
                component="img"
                src={IncreaseIcon}
                className="opacity-[0.25] w-[10px] xl:w-[19px]"
              />
            </div>
            <div className="flex items-center" dir="ltr">
              <Box
                component="img"
                src={SalesIcon}
                className="w-[7px] sm:w-[13px] xl:w-[25px] h-[7px] sm:h-[13px] xl:h-[25px]"
              />
              <span className="ml-[8px]">{t('sales')}</span>
              <Box
                component="img"
                src={IncreaseIcon}
                className="opacity-[0.25] w-[10px] xl:w-[19px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          'flex w-[100%] m-auto mb:m-0 mb:w-[290px] sm:w-[350px] md:w-[700px] absolute items-end  mb:h-[370px] sm:h-[400px] xl:h-[671px] ' +
          (lng
            ? 'justify-end sm:right-[14px] xl:right-[0px] right-0'
            : 'justify-start sm:left-[14px] xl:left-[35px] left-0')
        }
      >
        <img
          src={PromotePic}
          alt="model"
          className={
            'transform h-[300px] sm:h-[347px] xl:h-[671px] ' +
            (lng ? 'scale-x-[-1]' : 'scale-x-[1]')
          }
        />
      </div>
    </div>
  )
}
