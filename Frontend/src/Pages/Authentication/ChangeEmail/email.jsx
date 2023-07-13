import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import AuthService from '../../../Services/auth'
import LogoEn from '../../../Assests/Images/logo_en.png'
import LeftBitIcon_Green from '../../../Assests/Images/leftbit_green.png'
import MailBoxIcon from '../../../Assests/Images/mailbox.png'
import i18n from '../../../i18n'
import { emailValidation } from '../../../Utils/Validation'

const Email = ({ setLoadingOpen }) => {
  const [email, setEmail] = useState('')
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  const navigate = useNavigate()
  const [emailError, setEmailError] = useState(null)
  const handleSend = async () => {
    if (!emailValidation(email)) {
      setEmailError('Invalid email')
      setLoadingOpen(false)
      return
    } else {
      setEmailError(null)
    }
    await AuthService.sendEmail(email, setLoadingOpen)
  }

  return (
    <div
      className={`w-full lg:w-[52%] h-full flex justify-start lg:justify-center items-center flex-col mt-[347px] lg:mt-0 ${
        lng ? 'font-[poppins]' : 'font-[almarai]'
      }`}
    >
      <div className="w-[90%] sm:w-[504px] h-[582px] flex flex-col items-center bg-white filter drop-shadow-lg px-[35px] pt-[25px] pb-[20px] relative">
        <div className="flex flex-col w-full justify-center items-center">
          <img src={LogoEn} alt="Logo" className="w-[176px] h-[62px]" />
          <img
            src={MailBoxIcon}
            alt="mailbox"
            className="w-[66px] h-[66px] mt-[30px]"
          />
        </div>

        <h1 className="text-[19px] leading-[31px] text-[#07122f] font-bold mt-[28px] w-full">
          {t('whatyouremailaddress')}
        </h1>
        <h3 className="text-[12px] leading-[18px] text-[#312f2f] mt-[12px] w-full min-h-[62px]">
          {t('verifyingyouremail')}
        </h3>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          className="border-none focus:outline-none mt-[11px] bg-[#7c957f] bg-opacity-5 w-full h-[53px] py-[19px] px-[16px] text-[14px] text-[#b1bbc6] leading-[21px]"
          type="text"
          placeholder={t('youremailplaceholder')}
        />
        {emailError && (
          <span className="text-left w-full text-[#AA0000]  text-[12px] mt-[5px]">
            Invalid email
          </span>
        )}
        <div dir="ltr" className="w-full flex justify-between mt-[82px]">
          <div
            className="flex text-[12px] sm:text-[17px] leading-[15px] text-[#312f2f] font-[500] items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img
              src={LeftBitIcon_Green}
              alt="previous"
              className="w-[10px] h-[18px] cursor-pointer mr-[9px]"
            />
            Back
          </div>
          <Button
            className={`${
              lng ? 'font-[poppins]' : 'font-[almarai]'
            } w-[130px] sm:w-[193px] h-[40px] bg-[#009800] flex normal-case justify-center items-center cursor-pointer text-[12px] sm:text-[18px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
            disabled={!email}
            onClick={() => {
              setLoadingOpen(true)
              handleSend()
            }}
          >
            {t('sendverification')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Email
