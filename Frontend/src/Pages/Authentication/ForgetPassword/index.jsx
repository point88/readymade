import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import DontWorryIcon from '../../../Assests/Images/dontWorry.png'
import ResetForm from './reset'
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
            className="w-[128px] lg:w-[191.76px] h-[128px] lg:h-[191.76px]"
            src={DontWorryIcon}
            alt="smile"
          />
          <div
            className={`mt-0 lg:mt-[22px] ${
              lng ? 'sm:mr-[45px]' : 'sm:ml-[45px]'
            } lg:mr-[0px] lg:ml-[0px]`}
          >
            <h1
              className={`${
                lng
                  ? 'text-center sm:text-left lg:text-center'
                  : 'text-center sm:text-right lg:text-center'
              } ${
                lng
                  ? 'text-[20px] lg:text-[25px]'
                  : 'text-[40px] lg:text-[54px]'
              } font-bold font-[almarai] leading-[60px] text-[#FEFEFE]`}
            >
              {t('signintitle31')}
            </h1>
            <h1
              className={`${
                lng
                  ? 'text-center sm:text-left lg:text-center'
                  : 'text-center sm:text-right lg:text-center'
              } text-[40px] md:text-[51px] font-bold font-[almarai] leading-[60px] text-[#FEFEFE]`}
            >
              ReadyMade.
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-transparent w-full lg:w-[52%] h-full absolute lg:relative top-0 flex lg:block justify-center">
        <div className="bg-transparent lg:bg-opacity-[0.7] lg:h-full flex flex-col items-center justify-start lg:justify-center">
          <ResetForm setLoadingOpen={setLoadingOpen} />

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
