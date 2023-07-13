import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import WelcomeIcon from '../../../Assests/Images/welcome.png'
import WelcomeIcon_Green from '../../../Assests/Images/welcome_green.png'
import VerificationForm from './verification'
import i18n from '../../../i18n'

export default () => {
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  const [loadingOpen, setLoadingOpen] = useState(false)

  return (
    <div
      dir={lng ? 'ltr' : 'rtl'}
      className="block lg:flex w-full h-[1143px] lg:h-[1024px] relative"
    >
      <div className="bg-[#FED821] w-full lg:w-[48%] h-[508px] lg:h-full block lg:flex justify-center items-center m-auto pt-[82px] lg:pt-0">
        <div
          dir={lng ? 'ltr' : 'rtl'}
          className="flex flex-col sm:flex-row-reverse lg:flex-col items-center justify-center"
        >
          <img
            className="w-[116.28px] lg:w-[151.52px] h-[115.67px] lg:h-[150.72px] hidden lg:block"
            src={WelcomeIcon}
            alt="smile"
          />
          <img
            className="sm:w-[116.28px] lg:w-[151.52px] sm:h-[115.67px] lg:h-[150.72px] block lg:hidden w-[80px] h-[80px]"
            src={WelcomeIcon_Green}
            alt="smile"
          />
          <h1
            className={`${
              lng
                ? 'text-center sm:text-left lg:text-center'
                : 'text-center sm:text-right lg:text-center'
            } mt-0 lg:mt-[28.5px] mr-[0px] ${
              lng ? 'sm:mr-[45px]' : 'sm:ml-[45px]'
            } lg:mr-[0px] lg:ml-[0px] text-[40px] md:text-[51px] font-bold font-[almarai] leading-[60px] text-[#FEFEFE] max-w-[320.96px]`}
          >
            {t('signintitle2')}
          </h1>
        </div>
      </div>
      <div className="bg-transparent w-full lg:w-[52%] h-full absolute lg:relative top-0 flex lg:block justify-center">
        <div className="bg-transparent lg:bg-opacity-[0.7] lg:h-full flex flex-col items-center justify-start lg:justify-center">
          <VerificationForm setLoadingOpen={setLoadingOpen} />

          <div
            dir="ltr"
            className={`font-[poppins] text-[12px] text-[#8d93a1] leading-[18px] font-[400] absolute ${
              lng ? 'right-[40px]' : 'left-[40px]'
            } bottom-[20px] mt-auto hidden lg:block`}
          >
            ©Copyright Readymade 2023
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
