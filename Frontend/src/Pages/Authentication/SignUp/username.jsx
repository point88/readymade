import { useState } from 'react'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import LogoEn from '../../../Assests/Images/logo_en.png'
import LeftBitIcon_Green from '../../../Assests/Images/leftbit_green.png'
import i18n from '../../../i18n'

const UserName = ({ setStep, step, userName, setUserName }) => {
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false

  const [userNameError, setUserNameError] = useState(null)
  const handleNext = () => {
    if (userName.length === 0) {
      setUserNameError('Invalid UserName')
      return
    } else {
      setUserNameError(null)
    }

    // Proceed to next step if no errors
    setStep(step + 1)
  }

  return (
    <div
      className={`w-full lg:w-[52%] h-full flex justify-start lg:justify-center items-center flex-col mt-[347px] lg:mt-0 ${
        lng ? 'font-[poppins]' : 'font-[almarai]'
      }`}
    >
      <div className="w-[90%] sm:w-[372px] h-[503px] flex flex-col items-center bg-white filter drop-shadow-lg px-[36px] py-[28px] relative">
        <div dir="ltr" className="flex w-full justify-between items-end">
          <img
            src={LeftBitIcon_Green}
            alt="previous"
            className="w-[10px] h-[18px] cursor-pointer mb-[8px]"
            onClick={() => setStep(step - 1)}
          />
          <img src={LogoEn} alt="Logo" className="w-[176px] h-[57px]" />
          <img
            src={LeftBitIcon_Green}
            alt="previous"
            className="opacity-0 w-[10px] h-[18px]"
          />
        </div>
        <h1 className="text-[19px] leading-[31px] text-[#07122f] font-bold mt-[25px] w-full">
          {t('chooseusername')}
        </h1>
        <h3 className="text-[12px] leading-[18px] text-[#312f2f] mt-[20px]">
          {t('usernamenote')}
        </h3>
        <input
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value)
          }}
          className="border-none focus:outline-none mt-[35px] bg-[#7c957f] bg-opacity-5 w-full mb:w-[300px] h-[53px] py-[19px] px-[16px] text-[10px] mb:text-[14px] text-[#b1bbc6] leading-[21px]"
          type="text"
          placeholder={t('usernameplaceholder')}
        />
        {userNameError && (
          <span className="text-left w-full text-[#AA0000]  text-[12px] mt-[5px]">
            Invalid UserName
          </span>
        )}
        <div className="mt-[16px] w-full mb:w-[300px] h-[62px] flex justify-between items-center">
          <span className="text-[12px] font-[500] leading-[18px] text-[#312F2F]">
            {t('suggestions')}{' '}
            <span className="text-[12px] font-[500] leading-[18px] text-[#00AC00]">
              username1. / username 14
              <br />
              Username 18
            </span>
          </span>
        </div>
        <Button
          className={`${
            lng ? 'font-[poppins]' : 'font-[almarai]'
          } normal-case mt-[40px] w-full mb:w-[300px] h-[60px] bg-[#009800] flex justify-center items-center cursor-pointer text-[18px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
          onClick={() => {
            handleNext()
          }}
        >
          {t('nextbutton')}
        </Button>
      </div>
    </div>
  )
}
export default UserName
