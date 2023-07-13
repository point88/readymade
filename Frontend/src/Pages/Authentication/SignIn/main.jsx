import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toast'
import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login'
import RightBitIcon_Yellow from '../../../Assests/Images/rightbit_yellow.png'
import RightBitIcon_Blue from '../../../Assests/Images/rightbit_blue.png'
import LogoEn from '../../../Assests/Images/logo_en.png'
import GoogleIcon from '../../../Assests/Images/google_icon.png'
// import AppleIcon from '../../../Assests/Images/apple_icon.png'
// import FaceBookIcon from '../../../Assests/Images/facebook_icon.png'
import GoogleStoreIcon from '../../../Assests/Images/googlestore.png'
import AppleStoreIcon from '../../../Assests/Images/applestore.png'
import { CustomButton } from '../../../Components/Buttons/customsocialbutton'
import i18n from '../../../i18n'
import { LoginWithLinkedIn } from '../../../Utils/Linkedin'

export default ({ setLoadingOpen, onSubmit }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogoutSuccess = useCallback(() => {
    setEmail('')
    alert('logout success')
  }, [])

  const handleNext = () => {
    // Validate email and password
    if (
      !/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(email) ||
      !email
    ) {
      setEmailError('Invalid email')
      return
    } else {
      setEmailError(null)
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      return
    } else {
      setPasswordError(null)
    }
    if (
      !/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(email) ||
      !email
    ) {
      toast.warn('Email not valid.')
      return
    }
    setLoadingOpen(true)
    onSubmit(email, password)
    // dispatch(login(requestParams, setLoadingOpen, navigate))
    // Proceed to next step if no errors
  }
  return (
    <div
      className={`w-full lg:w-[52%] h-full flex justify-start lg:justify-center items-center flex-col mt-[282px] lg:mt-0 ${
        lng ? 'font-[poppins]' : 'font-[almarai]'
      }`}
    >
      <div className="w-[90%] sm:w-[425px] lg:w-[372px] h-[700px] flex flex-col items-center bg-white filter drop-shadow-lg px-[36px] pt-[0px] lg:pt-[17px] pb-[17px] relative">
        <img src={LogoEn} alt="Logo" className="w-[176px] h-[57px] my-[9px]" />
        <h1 className="text-[24px] leading-[36px] font-[500] text-[#07122f]">
          {t('signin11')}{' '}
          <span className="font-regular lg: font-semibold">
            {t('signin12')}
          </span>
        </h1>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-none focus:outline-none mt-[24px] bg-[#7c957f] bg-opacity-5 w-full mb:w-[300px] h-[53px] py-[19px] px-[16px] text-[10px] mb:text-[14px] text-[#b1bbc6] leading-[21px]"
          type="text"
          placeholder={t('emailplaceholder')}
        />
        {emailError && (
          <span className="text-left w-full text-[#AA0000]  text-[12px] mt-[5px]">
            Invalid email
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
            Password must be at least 8 characters
          </span>
        )}
        <div
          className={`mt-[23px] w-full mb:w-[300px] h-[60px] flex justify-between bg-[#e2ebf4] ${
            lng ? 'pl-[24px]' : 'pr-[24px]'
          } items-center`}
        >
          <h1 className="text-[10px] mb:text-[14px] text-[#00A800]">
            {t('signin')}
          </h1>
          <div
            className="h-full bg-[#00A400] w-[56px] flex items-center justify-center cursor-pointer"
            onClick={() => {
              handleNext()
            }}
          >
            <img
              src={RightBitIcon_Yellow}
              alt="rightbit"
              className={`transform ${lng ? 'scale-x-[1]' : 'scale-x-[-1]'}`}
            ></img>
          </div>
        </div>
        <div className="mt-[24px] w-full mb:w-[300px]">
          <h1
            className="text-[12px] text-[#00A200] leading-[18px] font-[500] cursor-pointer"
            onClick={() => {
              navigate('/forgotpassword')
            }}
          >
            {t('forgotmypassword')}
          </h1>
        </div>
        <div className="mt-[15px] h-[1px] w-full mb:w-[300px] border-solid border-[1px] border-[#e4ebf3]"></div>
        <div className="mt-[5px] mb-[10px]">
          <h1 className="text-[12px] text-[#00A200] leading-[18px] font-[500]">
            {t('orloginwith')}
          </h1>
        </div>
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
            onLogoutSuccess={onLogoutSuccess}
            redirect_uri={process.env.REACT_APP_REDIRECT_URL}
            onResolve={({ provider, data }) => onSubmit(data.email, data.sub)}
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
            // onLoginStart={onLoginStart}
            redirect_uri={process.env.REACT_APP_REDIRECT_URL}
            scope="openid profile email"
            discoveryDocs="claims_supported"
            access_type="offline"
            onResolve={({ provider, data }) => onSubmit(data.email, data.sub)}
            className="flex h-full w-full justify-between"
            onReject={(err) => {
              console.log(err)
            }}
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
            onSuccess={(email, password) => onSubmit(email, password)}
          />
        </div>
        {/* <div className={`mt-[10px] w-full mb:w-[300px] h-[60px] flex justify-between bg-transparent ${lng ? 'pl-[24px]' : 'pr-[24px]'} items-center border-solid border-[1px] border-[#E4EBF3]`}>
                    <div className='text-[10px] mb:text-[14px] text-[#07122f] flex justify-start items-center gap-x-[16px]'>
                        <img src={FaceBookIcon} alt="facebook_icon" className='w-[25px] h-[25px]'></img>
                        <h1 className='w-[70%] sm:w-full'>{t('connectfacebook')}</h1>
                    </div>
                    <div className='h-full bg-[#e4ebf3] w-[56px] flex items-center justify-center cursor-pointer'>
                        <img src={RightBitIcon_Blue} alt="rightbit" className={`transform ${lng ? 'scale-x-[1]' :'scale-x-[-1]'}`}></img>
                    </div>
                </div> 

                <div className={`mt-[16px] w-full mb:w-[300px] h-[60px] flex justify-between bg-transparent  ${lng ? 'pl-[24px]' : 'pr-[24px]'} items-center border-solid border-[1px] border-[#E4EBF3]`}>
                    <div className='text-[10px] mb:text-[14px] text-[#07122f] flex justify-start items-center gap-x-[16px]'>
                        <img src={GoogleIcon} alt="facebook_icon"  className='w-[25px] h-[25px]'></img>
                        <h1 className='w-[70%] sm:w-full'>{t('connectgoogle')}</h1>
                    </div>
                    <div className='h-full bg-[#e4ebf3] w-[56px] flex items-center justify-center cursor-pointer'>
                        <img src={RightBitIcon_Blue} alt="rightbit" className={`transform ${lng ? 'scale-x-[1]' :'scale-x-[-1]'}`}></img>
                    </div>
                </div>

                <div className={`mt-[16px] w-full mb:w-[300px] h-[60px] flex justify-between bg-transparent  ${lng ? 'pl-[24px]' : 'pr-[24px]'} items-center border-solid border-[1px] border-[#E4EBF3]`}>
                    <div className='text-[10px] mb:text-[14px] text-[#07122f] flex justify-start items-center gap-x-[16px]'>
                        <img src={AppleIcon} alt="facebook_icon"  className='w-[25px] h-[25px]'></img>
                        <h1 className='w-[70%] sm:w-full'>{t('connectapple')}</h1>
                    </div>
                    <div className='h-full bg-[#e4ebf3] w-[56px] flex items-center justify-center cursor-pointer'>
                        <img src={RightBitIcon_Blue} alt="rightbit" className={`transform ${lng ? 'scale-x-[1]' :'scale-x-[-1]'}`}></img>
                    </div>
                </div> */}
        <div className="mt-[15px] h-[1px] w-full mb:w-[300px] border-solid border-[1px] border-[#e4ebf3]"></div>
        <div className="mt-[6px] w-full mb:w-[300px] flex">
          <h1 className="text-[12px] text-[#07122F] leading-[18px] font-[400]">
            {t('donothaveaccount')}
          </h1>
          <h1
            className="text-[12px] text-[#00A200] leading-[18px] font-[400] cursor-pointer"
            onClick={() => {
              navigate('/signup')
            }}
          >
            &nbsp;{t('signup')}
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
            ></img>
            <img
              src={AppleStoreIcon}
              alt="appleplaystore"
              className="w-[164px] h-[48px]"
            ></img>
          </div>
        </div>
      </div>
    </div>
  )
}
