import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import i18n from '../../../i18n'
import AuthService from '../../../Services/auth'
import LeftBitIcon_Green from '../../../Assests/Images/leftbit_green.png'
import LogoEn from '../../../Assests/Images/logo_en.png'

const ResetPasswordForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const lng = i18n.language === 'en' ? true : false
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoadingOpen] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleSend = async () => {
    if (
      password === '' ||
      confirmPassword === '' ||
      password !== confirmPassword
    ) {
      setShowError(true)
      return
    }
    setLoadingOpen(true)
    await AuthService.resetPassword(password, setLoadingOpen)
    navigate('/signin')
  }

  return (
    <div
      className={`w-full lg:w-[52%] h-full flex justify-start lg:justify-center items-center flex-col mt-[347px] lg:mt-0 ${
        lng ? 'font-[poppins]' : 'font-[Almarai]'
      }`}
    >
      <div className="w-[90%] sm:w-[372px] h-fit sm:h-[503px] flex flex-col justify-between items-center bg-white filter drop-shadow-lg px-[36px] py-[25.6px] relative">
        <div className="relative w-full flex justify-center">
          <img
            src={LogoEn}
            alt="Logo"
            className="w-[150px] mb:w-[176px] h-[57px]"
          />
          <img
            src={LeftBitIcon_Green}
            alt="LeftBit"
            className="w-[8px] h-[16px] absolute left-0 bottom-1 cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>
        <div>
          <h1 className="mt-[25.2px] text-[19px] leading-[36px] font-bold text-[#07122f] text-center">
            {t('newpassword')}
          </h1>
          <div className="mt-[9px] h-fit sm:h-[62px] w-full mb:w-[309px] lg:w-full">
            <div className="text-[12px] leading-[18px] text-[#312F2F] font-[500] text-center">
              {t('enteryouremail')}
            </div>
          </div>
        </div>
        <div>
          <input
            className="border-none focus:outline-none mt-[10px] bg-[#7c957f] bg-opacity-5 w-full mb:w-[300px] h-[53px] py-[19px] px-[16px] text-[14px] text-[#b1bbc6] leading-[21px]"
            type="password"
            placeholder={t('passwordplaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="border-none focus:outline-none mt-[10px] bg-[#7c957f] bg-opacity-5 w-full mb:w-[300px] h-[53px] py-[19px] px-[16px] text-[14px] text-[#b1bbc6] leading-[21px]"
            type="password"
            placeholder={t('confirmpassword')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button
          className={`${
            lng ? 'font-[poppins]' : 'font-[almarai]'
          } normal-case mt-5 w-full h-[50px] bg-[#009800] flex justify-center items-center cursor-pointer text-[18px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
          onClick={handleSend}
        >
          {t('nextbutton')}
        </Button>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  )
}

export default ResetPasswordForm
