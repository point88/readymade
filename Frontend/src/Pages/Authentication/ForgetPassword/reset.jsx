import LeftBitIcon_Green from '../../../Assests/Images/leftbit_green.png'
import LogoEn from '../../../Assests/Images/logo_en.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthService from '../../../Services/auth'
import { useTranslation } from 'react-i18next'
import i18n from '../../../i18n'

export default ({ setLoadingOpen }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  const [emailError, setEmailError] = useState(null)
  const [email, setEmail] = useState('')

  const handleSend = async () => {
    if (
      !/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(email) ||
      !email
    ) {
      setEmailError('Invalid email')
      setLoadingOpen(false)
      return
    } else {
      setEmailError(null)
    }
    await AuthService.sendNewPassword(email, setLoadingOpen)
    navigate(`/verifyreset/${email}`, { email })
  }
  return (
    <div
      className={`${
        lng ? 'font-[poppins]' : 'font-[Almarai]'
      } w-full lg:w-[52%] h-full flex justify-start lg:justify-center items-center flex-col mt-[347px] lg:mt-0`}
    >
      <div className="w-[90%] sm:w-[372px] h-[503px] flex flex-col items-center bg-white filter drop-shadow-lg px-[36px] py-[25.6px] relative">
        <div className="relative w-full flex justify-center">
          <img
            src={LogoEn}
            alt="Logo"
            className="w-[150px] sm:w-[176px] h-[57px]"
          />
          <img
            src={LeftBitIcon_Green}
            alt="LeftBit"
            className="w-[8px] h-[16px] absolute left-0 bottom-1 cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>
        <h1 className="mt-[25.2px] text-[15px] lg:text-[19px] leading-[36px] font-bold text-[#07122f]">
          {t('resetyourpassword')}
        </h1>
        <div className="mt-[9px] h-[62px] text-center">
          <h2 className="text-[12px] leading-[18px] text-[#312F2F] font-[500]">
            {t('resetyourpasswordbrief')}
          </h2>
        </div>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          className="border-none focus:outline-none mt-[10px] bg-[#7c957f] bg-opacity-5 w-full mb:w-[300px] h-[53px] py-[19px] px-[16px] text-[14px] text-[#b1bbc6] leading-[21px]"
          type="text"
          placeholder={t('enteremailplaceholder')}
        />
        {emailError && (
          <span className="text-left w-full text-[#AA0000]  text-[12px] mt-[5px]">
            Invalid email
          </span>
        )}
        <input />
        <div
          className="mt-[50.2px] w-full mb:w-[300px] h-[60px] flex justify-center bg-[#009800] items-center cursor-pointer"
          onClick={() => {
            setLoadingOpen(true)
            handleSend()
          }}
        >
          <h1 className="text-[18px] text-white font-[500]">
            {t('nextbutton')}
          </h1>
        </div>
      </div>
    </div>
  )
}
