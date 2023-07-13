import { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@mui/material'
import AuthService from '../../../Services/auth'
import LogoEn from '../../../Assests/Images/logo_en.png'
import LeftBitIcon_Green from '../../../Assests/Images/leftbit_green.png'
import MailCheckedIcon from '../../../Assests/Images/mailchecked.png'
import i18n from '../../../i18n'

const EmailVerified = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const query = useParams()
  const lng = i18n.language === 'en' ? true : false
  const [isDisable, setIsDisable] = useState(false)
  const email = useMemo(() => query?.key.split('-')[0], [query])
  const key = useMemo(() => query?.key.split('-')[1], [query])

  useEffect(() => {
    async function verifyEmail() {
      const result = await AuthService.verifyEmail(key)
      setIsDisable(result)
    }
    verifyEmail()
  }, [query])

  return (
    <div
      className={`${
        lng ? 'font-[poppins]' : 'font-[almarai]'
      } w-full lg:w-[52%] h-full flex justify-start lg:justify-center items-center flex-col mt-[347px] lg:mt-0`}
    >
      <div className="w-[90%] sm:w-[504px] h-[582px] flex flex-col items-center bg-white filter drop-shadow-lg px-[35px] pt-[28px] pb-[20px] relative">
        <div className="flex flex-col w-full justify-center items-center">
          <img src={LogoEn} alt="Logo" className="w-[176px] h-[62px]" />
          <img
            src={MailCheckedIcon}
            alt="mailbox"
            className="w-[109px] h-[89px] mt-[63px]"
          />
        </div>

        <h1 className="text-[19px] leading-[21px] text-[#07122f] font-bold mt-[12px] w-full mb:w-[300px] text-center h-[60px]">
          {t('thanks')}
          <br />
          {t('youremailisverified')}
        </h1>
        <h3 className="font-[poppins] text-[14px] leading-[16px] text-[#312f2f] mt-[7px] w-full text-center">
          {email}
        </h3>
        <div dir="ltr" className="w-full flex justify-between mt-[129px]">
          <div
            className="flex text-[17px] leading-[15px] text-[#312f2f] font-[500] items-center cursor-pointer"
            onClick={() => navigate('-1')}
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
            onClick={() => {
              navigate('/new/payment-verify')
            }}
            disabled={!isDisable}
          >
            {t('nextbutton')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EmailVerified
