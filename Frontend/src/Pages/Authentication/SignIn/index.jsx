import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import WelcomeIcon from '../../../Assests/Images/welcome.png'
import MainSignInForm from './main'
import i18n from '../../../i18n'
import AuthService from '../../../Services/auth'

export default () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [loadingOpen, setLoadingOpen] = useState(false)
  const lng = i18n.language === 'en' ? true : false

  const handleSignin = async (email, password) => {
    await AuthService.signin(
      {
        email,
        password,
      },
      setLoadingOpen,
    )
    navigate('/')
  }
  return (
    <div
      dir={lng ? 'ltr' : 'rtl'}
      className="block lg:flex w-full h-[1143px] lg:h-[1024px] relative"
    >
      <div className="bg-[#FED821] w-full lg:w-[48%] h-[508px] lg:h-full block lg:flex justify-center items-center m-auto pt-[82px] lg:pt-0">
        <div
          dir={lng ? 'ltr' : 'rtl'}
          className="flex flex-col sm:flex-row-reverse lg:flex-col items-center justify-between w-[90%] mb:w-[360px] sm:w-[446px] m-auto"
        >
          <img
            className="sm:w-[116.28px] lg:w-[151.52px] sm:h-[115.67px] lg:h-[150.72px] w-[80px] h-[80px]"
            src={WelcomeIcon}
            alt="smile"
          />
          <h1
            className={`text-left mt-[30px] text-[40px] md:text-[53px] lg:text-[64px] font-bold leading-[60px] text-[#FEFEFE] lg:text-[#07122F] hidden lg:block ${
              lng ? 'font-[inter]' : 'font-[almarai]'
            }`}
          >
            {t('signintitle11')}
          </h1>
          <h1
            className={`${
              lng ? 'text-center sm:text-left' : 'text-center sm:text-right'
            } ${
              lng ? 'sm:mr-[40px]' : 'sm:ml-[40px]'
            } text-[40px] md:text-[53px] lg:text-[64px] font-bold font-[almarai] leading-[60px] text-[#FEFEFE] lg:text-[#07122F] block lg:hidden max-w-[320.96px]`}
          >
            {t('signintitle12')}
          </h1>
        </div>
      </div>
      <div className="bg-transparent w-full lg:w-[52%] h-full absolute lg:relative top-0 flex lg:block justify-center">
        <div className="bg-transparent lg:bg-opacity-[0.7] lg:h-full flex flex-col items-center justify-start lg:justify-center">
          <MainSignInForm
            setLoadingOpen={setLoadingOpen}
            onSubmit={handleSignin}
          />

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
