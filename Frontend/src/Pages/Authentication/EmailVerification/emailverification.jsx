import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import AuthService from '../../../Services/auth'
import LogoEn from '../../../Assests/Images/logo_en.png'
import LeftBitIcon_Green from '../../../Assests/Images/leftbit_green.png'
import MailBoxIcon from '../../../Assests/Images/mailbox.png'
import i18n from '../../../i18n'

export default ({ setLoadingOpen }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const lng = i18n.language === 'en' ? true : false
  const email = localStorage.getItem('tempEmail')
  const username = localStorage.getItem('tempUserName')

  const handleResend = async () => {
    await AuthService.sendEmail(email, setLoadingOpen)
  }

  return (
    <div
      className={`w-full lg:w-[52%] h-full flex justify-start lg:justify-center items-center flex-col mt-[347px] lg:mt-0 ${
        lng ? 'font-[poppins]' : 'font-[almarai]'
      }`}
    >
      <div className="w-[90%] sm:w-[504px] h-[582px] flex flex-col items-center bg-white filter drop-shadow-lg px-[35px] pt-[28px] pb-[20px] relative">
        <div className="absolute text-[19px] leading-[31px] text-[#07122f] font-bold top-[-40px] w-full">
          {t('emailverification')}
        </div>

        <div className="flex flex-col w-full justify-center items-center">
          <img src={LogoEn} alt="Logo" className="w-[176px] h-[62px]" />
          <img
            src={MailBoxIcon}
            alt="mailbox"
            className="w-[110px] h-[110px] mt-[30px]"
          />
        </div>

        <h1 className="text-[18px] leading-[26px] text-[#07122f] font-bold mt-[42px] w-full text-center h-[47px]">
          {t('almostthere')}&nbsp;{username}
          <br />
          {t('checkyouremail')}
        </h1>
        <h3 className="font-[poppins] text-[12px] leading-[18px] text-[#312f2f] mt-[30px] w-full text-center font-[500]">
          {email}
        </h3>
        <div
          className="mt-[23px] flex text-[15px] leading-[18px] text-[#009c00] font-[500] items-center cursor-pointer hover:underline"
          onClick={() => {
            setLoadingOpen(true)
            handleResend()
          }}
        >
          {t('resendemail')}
        </div>
        <div
          className="mt-[18px] flex text-[15px] leading-[18px] text-[#009c00] font-[500] items-center cursor-pointer hover:underline"
          onClick={() => {
            navigate('/new/email-verify')
          }}
        >
          {t('changeemail')}
        </div>
        <div dir="ltr" className="w-full flex justify-between mt-[29px]">
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
            } bg-opacity-30 normal-case w-[110px] h-[40px] bg-[#009800] flex justify-center items-center cursor-pointer text-[18px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
            onClick={() => {}}
          >
            {t('nextbutton')}
          </Button>
        </div>
      </div>
    </div>
  )
}
