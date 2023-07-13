import RightBitIcon_Yellow from '../../../Assests/Images/rightbit_yellow.png'
import RightBitIcon_Blue from '../../../Assests/Images/rightbit_blue.png'
import LogoEn from '../../../Assests/Images/logo_en.png'
import GoogleIcon from '../../../Assests/Images/google_icon.png'
// import AppleIcon from '../../../Assests/Images/apple_icon.png'
import GoogleStoreIcon from '../../../Assests/Images/googlestore.png'
import AppleStoreIcon from '../../../Assests/Images/applestore.png'
import { useTranslation } from 'react-i18next'
import i18n from '../../../i18n'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login'

import { CustomButton } from '../../../Components/Buttons/customsocialbutton'
import { emailValidation } from '../../../Utils/Validation'
import { LoginWithLinkedIn } from '../../../Utils/Linkedin'

export default ({
  email,
  setEmail,
  password,
  setPassword,
  checked,
  setCheck,
  onSubmit,
  setIsSocialLogin,
}) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [checkError, setCheckError] = useState(null)

  const handleNext = () => {
    // Validate email and password
    if (!emailValidation(email)) {
      setEmailError('Invalid email')
      return
    } else {
      setEmailError(null)
    }

    if (password.length <= 8) {
      setPasswordError('Password must be more than 8 characters')
      return
    } else {
      setPasswordError(null)
    }

    if (!checkError) {
      setCheckError('Please agree Agreement and Privacy Policy')
      return
    } else {
      setCheckError(null)
    }
    onSubmit({ email, password })
    // Proceed to next step if no errors
  }

  return (
    <div
      className={`w-full lg:w-[52%] h-full flex justify-start lg:justify-center items-center flex-col mt-[250px] lg:mt-0 relative  ${
        lng ? 'font-[poppins]' : 'font-[almarai]'
      }`}
    >
      <div className="w-[90%] sm:w-[448px] h-[746px] flex flex-col items-center bg-white filter drop-shadow-lg px-[36px] sm:px-[74px] py-[31px] relative">
        <img src={LogoEn} alt="Logo" className="w-[176px] h-[57px]" />
        {/* <div
          className={`mt-[31px] w-full mb:w-[300px] h-[60px] flex justify-between bg-transparent ${
            lng ? 'pl-[24px]' : 'pr-[24px]'
          }  items-center border-solid border-[1px] border-[#E4EBF3]`}
        >
          <LoginSocialFacebook
            appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID || ''}
            fieldsProfile={
              'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
            }
            // onLoginStart={onLoginStart}
            redirect_uri={process.env.REACT_APP_REDIRECT_URL}
            onResolve={({ provider, data }) =>
              onSubmit({ email: data.email, password: data.sub })
            }
            className="flex h-full w-full justify-between"
            onReject={(err) => {
              console.log(err)
            }}
          >
            <div className="text-[10px] mb:text-[14px] text-[#07122f] flex justify-start items-center gap-x-[16px]">
              <img
                src={FaceBookIcon}
                alt="facebook_icon"
                className="w-[25px] h-[25px]"
              ></img>
              <h1 className="w-[70%] sm:w-full">{t('connectfacebook')}</h1>
            </div>
            <CustomButton
              className="h-full"
              lng={lng}
              rightIcon={RightBitIcon_Blue}
            />
          </LoginSocialFacebook>
        </div> */}
        <div
          className={`mt-[16px] w-full mb:w-[300px] h-[60px] flex justify-between bg-transparent ${
            lng ? 'pl-[24px]' : 'pr-[24px]'
          } items-center border-solid border-[1px] border-[#E4EBF3]`}
        >
          <LoginSocialGoogle
            client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
            redirect_uri={process.env.REACT_APP_REDIRECT_URL}
            access_type="online"
            scope="email profile"
            onResolve={({ provider, data }) => {
              setIsSocialLogin(true)
              onSubmit({
                email: data.email,
                password: data.sub,
                isSocial: true,
              })
            }}
            className="flex h-full w-full justify-between"
          >
            <div className="text-[10px] mb:text-[14px] text-[#07122f] flex justify-start items-center gap-x-[16px]">
              <img
                src={GoogleIcon}
                alt="facebook_icon"
                className="w-[25px] h-[25px]"
              ></img>
              <h1 className="w-[70%] sm:w-full">{t('connectgoogle')}</h1>
            </div>
            <CustomButton
              className="h-full"
              lng={lng}
              rightIcon={RightBitIcon_Blue}
            />
          </LoginSocialGoogle>
        </div>

        <div
          className={`mt-[16px] w-full mb:w-[300px] h-[60px] flex justify-between bg-transparent ${
            lng ? 'pl-[24px]' : 'pr-[24px]'
          } items-center border-solid border-[1px] border-[#E4EBF3]`}
        >
          <LoginWithLinkedIn
            onSuccess={(res) => {
              setIsSocialLogin(true)
              onSubmit({ ...res, isSocial: true })
            }}
          />
        </div>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-none focus:outline-none mt-[24px] bg-[#7c957f] bg-opacity-5 w-full mb:w-[300px] h-[53px] py-[19px] px-[16px] text-[10px] mb:text-[14px] text-[#b1bbc6] leading-[21px]"
          type="text"
          placeholder={t('emailplaceholder')}
        />
        {emailError && (
          <span className="text-left w-full text-[#AA0000]  text-[12px] mt-[5px]">
            {emailError}
          </span>
        )}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-none focus:outline-none mt-[16px] bg-[#7c957f] bg-opacity-5 w-full mb:w-[300px] h-[53px] py-[19px] px-[16px] text-[10px] mb:text-[14px] text-[#b1bbc6] leading-[21px]"
          placeholder={t('passwordplaceholder')}
        />
        {passwordError && (
          <span className="text-[#AA0000] text-[12px] mt-[5px] text-left w-full">
            {passwordError}
          </span>
        )}
        <div
          className={`mt-[23px] w-full mb:w-[300px] h-[60px] flex justify-between bg-[#e2ebf4] ${
            lng ? 'pl-[24px]' : 'pr-[24px]'
          } items-center`}
        >
          <h1 className="text-[10px] mb:text-[14px] text-[#00A800]">
            {t('signup')}
          </h1>
          <div
            className="h-full bg-[#00A400] w-[56px] flex items-center justify-center cursor-pointer"
            onClick={() => handleNext()}
          >
            <img
              src={RightBitIcon_Yellow}
              alt="rightbit"
              className={`transform ${lng ? 'scale-x-[1]' : 'scale-x-[-1]'}`}
            />
          </div>
        </div>
        <div>
          <div className="flex items-start mt-[55px] w-full mb:w-[300px]">
            <input
              type="checkbox"
              className="mr-[8px]"
              value={checked}
              onChange={() => setCheck(!checked)}
            />
            <h1 className="text-[12px] text-[#312f2f] leading-[18px] font-[500]">
              {t('agreepolicy')}
            </h1>
          </div>
          {!checked && (
            <span className="text-[#AA0000] text-[12px] mt-[5px] text-left w-full">
              {checkError}
            </span>
          )}
        </div>
        <div className="mt-[35px] h-[1px] border-solid border-[1px] border-[#e4ebf3] w-full mb:w-[300px]"></div>
        <div className="mt-[15px] flex">
          <h1 className="text-[12px] text-[#07122F] leading-[18px] font-[400]">
            {t('alreadymember')}
          </h1>
          <h1
            className="text-[12px] text-[#00A200] leading-[18px] font-[400] cursor-pointer"
            onClick={() => {
              navigate('/signin')
            }}
          >
            &nbsp;{t('signin')}
          </h1>
        </div>
        <div
          dir="ltr"
          className="text-[12px] text-[#8d93a1] leading-[18px] font-[400] bottom-[-135px] mb:bottom-[-89px] absolute mt-auto"
        >
          <div className="flex justify-center gap-[25px] mb:flex-row flex-col">
            <img
              src={GoogleStoreIcon}
              alt="googleplaystore"
              className="w-[164px] h-[48px]"
            />
            <img
              src={AppleStoreIcon}
              alt="appleplaystore"
              className="w-[164px] h-[48px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
