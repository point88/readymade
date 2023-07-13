import { useState } from 'react'
import { Button, Backdrop, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AuthService from '../../../Services/auth'
import LogoEn from '../../../Assests/Images/logo_en.png'
import LeftBitIcon_Green from '../../../Assests/Images/leftbit_green.png'
import LockIcon from '../../../Assests/Images/lock.png'
import GetPaidFasterIcon from '../../../Assests/Images/paid_faster.png'
import RankHigherIcon from '../../../Assests/Images/rank_higher.png'
import FreeTrialIcon from '../../../Assests/Images/free_trial.png'

import i18n from '../../../i18n'

const PaymentVerification = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  const [loadingOpen, setLoadingOpen] = useState(false)
  const authedAs = useSelector((state) => state.authedAs)
  const handleSignin = async () => {
    const { email, password } = authedAs
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
      className={`${
        lng ? 'font-[poppins]' : 'font-[almarai]'
      } w-full lg:w-[52%] h-full flex justify-start lg:justify-center items-center flex-col mt-[274px] lg:mt-0`}
    >
      <div className="w-[calc(90%)] sm:w-[504px] h-[791px] flex flex-col items-center bg-white filter drop-shadow-lg px-[35px] pt-[98px] pb-[20px] relative">
        <div className="flex flex-col w-full justify-center items-center">
          <img src={LogoEn} alt="Logo" className="w-[176px] h-[62px]" />
          <img
            src={LockIcon}
            alt="mailbox"
            className="w-[62px] h-[86px] mt-[30px]"
          />
        </div>

        <h1 className="text-[19px] leading-[21px] text-[#07122f] font-bold mt-[18px] w-full mb:w-[350px] text-center">
          {t('verifypaymentmethod')}
        </h1>
        <h3 className="text-[14px] leading-[18px] text-[#312f2f] mt-[20px] text-center font-[500] w-[247px]">
          {t('yourpaymentmethodnote')}
        </h3>
        <Button
          className={`${
            lng ? 'font-[poppins]' : 'font-[almarai]'
          } mt-[44px] normal-case w-[231px] h-[40px] bg-[#009800] flex justify-center items-center cursor-pointer text-[15px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
          onClick={() => navigate('/new/payment-detail')}
        >
          {t('verifypaymentmethod')}
        </Button>
        <div dir="ltr" className="flex justify-between w-full mt-[60px]">
          <div className="flex flex-col items-center h-[105px] justify-between">
            <img src={GetPaidFasterIcon} alt="getpaidfaster" />
            <h1 className="text-[12px] sm:text-[16px] leading-[21px] text-[#07122f] font-bold ">
              {t('getpaidfaster')}
            </h1>
          </div>
          <div className="flex flex-col items-center h-[105px] justify-between">
            <img src={RankHigherIcon} alt="getpaidfaster" />
            <h1 className="text-[12px] sm:text-[16px] leading-[21px] text-[#07122f] font-bold ">
              {t('rankhigher')}
            </h1>
          </div>
          <div className="flex flex-col items-center h-[105px] justify-between">
            <img src={FreeTrialIcon} alt="getpaidfaster" />
            <h1 className="text-[12px] sm:text-[16px] leading-[21px] text-[#07122f] font-bold ">
              {t('freetrial')}
            </h1>
          </div>
        </div>

        <div dir="ltr" className="w-full flex justify-between mt-[84px]">
          <div
            className="flex text-[17px] leading-[15px] text-[#312f2f] font-[500] items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img
              src={LeftBitIcon_Green}
              alt="previous"
              className="w-[10px] h-[18px] cursor-pointer mr-[9px]"
            />
            {t('signin12')}
          </div>
          <Button
            className={`${
              lng ? 'font-[poppins]' : 'font-[almarai]'
            } normal-case w-[110px] h-[40px] bg-[#009800] flex justify-center items-center cursor-pointer text-[18px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
            onClick={handleSignin}
          >
            {t('skip')}
          </Button>
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

export default PaymentVerification
