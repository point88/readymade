// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoginSocialFacebook, LoginSocialLinkedin } from 'reactjs-social-login'
import { Button } from '@mui/material'
import LogoEn from '../../../Assests/Images/logo_en.png'
import LeftBitIcon_Green from '../../../Assests/Images/leftbit_green.png'
import FaceBookIcon from '../../../Assests/Images/facebook_icon.png'
import LinkedInIcon from '../../../Assests/Images/linkedin_icon.png'
import i18n from '../../../i18n'

const LinkAccount = ({ setStep, step, accountType, setSocialLink }) => {
  const navigate = useNavigate()
  // const [linkedAccount, setLinkedAccount] = useState(0)
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false

  const handleNext = () => {
    setSocialLink('https://linkedin.com')
    setStep(step + 1)
  }

  const handleNextWithAuth = (provider, data) => {
    setSocialLink('https://linkedin.com')
    setStep(step + 1)
  }

  const handleSkip = () => {
    setSocialLink('')
    setStep(step + 1)
  }
  return (
    <div
      className={`w-full lg:w-[52%] h-full flex justify-start lg:justify-center items-center flex-col mt-[367px] lg:mt-0 ${
        lng ? 'font-[poppins]' : 'font-[almarai]'
      }`}
    >
      <div className="w-[90%] sm:w-[372px] h-[503px] flex flex-col items-center bg-white filter drop-shadow-lg px-[19px] py-[28px] relative">
        <div className="absolute text-[19px] leading-[31px] text-[#07122f] font-bold top-[-40px] w-full">
          {t('linkaccount')}
        </div>
        <div dir="ltr" className="flex w-full justify-between items-end">
          <img
            src={LeftBitIcon_Green}
            alt="previous"
            className="w-[10px] h-[18px] cursor-pointer mb-[8px]"
            onClick={() => navigate(-1)}
          />
          <img src={LogoEn} alt="Logo" className="w-[176px] h-[57px]" />
          <img
            src={LeftBitIcon_Green}
            alt="previous"
            className="opacity-0 w-[10px] h-[18px]"
          />
        </div>
        <h1 className="text-[19px] leading-[31px] text-[#07122f] font-bold mt-[25px] w-full">
          {accountType === 1 ? t('linkcompanyaccount') : t('linkyouraccount')}
        </h1>
        <h3 className="text-[12px] leading-[18px] text-[#312f2f] mt-[20px] w-full h-[62px]">
          {t('benefitlinkaccount')}
        </h3>
        <div
          dir="ltr"
          className="flex flex-col justify-center gap-y-[8px] w-full  mt-[9px]"
        >
          <div className="flex justify-start items-center pl-[17px] pr-[23px] w-full bg-white drop-shadow-custom h-[77px] rounded-[10px] filter cursor-pointer">
            <LoginSocialFacebook
              appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID || ''}
              fieldsProfile={
                'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
              }
              // onLoginStart={onLoginStart}
              redirect_uri={process.env.REACT_APP_REDIRECT_URL}
              onResolve={({ provider, data }) =>
                handleNextWithAuth(provider, data)
              }
              className="flex w-full justify-between items-center"
              onReject={(err) => {
                console.log(err)
              }}
            >
              <img
                src={FaceBookIcon}
                alt="freelancer"
                className="w-[40px] h-[40px]"
              />
              <div className="h-full flex flex-col justify-center ml-[10px]">
                <h1 className="text-[#07122f] text-[15px] leading-[31px] font-bold">
                  Facebook
                </h1>
                <h1 className="text-[#312f2f] text-[10px] leading-[12px] font-[500]">
                  Import your photo, name, and email address
                </h1>
              </div>
            </LoginSocialFacebook>
          </div>
          <div
            onClick={handleNext}
            className="flex justify-start items-center pl-[17px] pr-[23px] w-full bg-white drop-shadow-custom h-[77px] rounded-[10px] filter cursor-pointer"
          >
            <LoginSocialLinkedin
              appId={process.env.REACT_APP_LINKEDIN_CLIENT_ID || ''}
              fieldsProfile={
                'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
              }
              // onLoginStart={onLoginStart}
              redirect_uri={process.env.REACT_APP_REDIRECT_URL}
              // onResolve={({ provider, data }) =>
              //   handleNextWithAuth(provider, data)
              // }
              className="flex w-full justify-between items-center"
              onReject={(err) => {
                console.log(err)
              }}
            >
              <img
                src={LinkedInIcon}
                className="w-[40px] h-[40px]"
                alt="freelancer"
              ></img>
              <div className="h-full flex flex-col justify-center ml-[10px]">
                <h1 className="text-[#07122f] text-[15px] leading-[31px] font-bold">
                  LinkedIn
                </h1>
                <h1 className="text-[#312f2f] text-[10px] leading-[12px] font-[500]">
                  Import your photo, name, and email address
                </h1>
              </div>
            </LoginSocialLinkedin>
          </div>
        </div>
        <Button
          className={`${
            lng ? 'font-[poppins]' : 'font-[almarai]'
          } mt-5 normal-case w-[90px] h-[40px] bg-[#009800] flex justify-center items-center cursor-pointer text-[18px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
          onClick={handleSkip}
        >
          {t('skip')}
        </Button>
      </div>
    </div>
  )
}

export default LinkAccount
