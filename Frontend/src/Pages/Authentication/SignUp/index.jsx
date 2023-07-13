import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'

import WelcomeIcon from '../../../Assests/Images/welcome.png'
import WelcomeIcon_Green from '../../../Assests/Images/welcome_green.png'
import MainSignUpForm from './main'
import UserNameForm from './username'
import SelectAccountForm from './selectaccount'
import { useTranslation } from 'react-i18next'
import i18n from '../../../i18n'
import AuthService from '../../../Services/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthedAs } from '../../../Services/reducers/authSlice'
import LinkAccountForm from '../LinkedAccount/linkaccount'
import ProfileDetail from '../ProfileDetail/profiledetails'

const SignUp = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const lng = i18n.language === 'en' ? true : false
  const authedAs = useSelector((state) => state.authedAs)
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setCheck] = useState(false)
  const [username, setUserName] = useState('')
  const [isSocialLogin, setIsSocialLogin] = useState(false)
  const [accountType, setAccountType] = useState('')
  const [loadingOpen, setLoadingOpen] = useState(false)

  const handleRegister = async (data) => {
    let payload =
      accountType === 1
        ? {
            username,
            account_type: accountType,
            ...data,
          }
        : {
            username,
            account_type: accountType,
            ...data,
          }
    setLoadingOpen(true)
    await AuthService.createProfile(payload, setLoadingOpen)
    !accountType
      ? navigate('/new/skills', { state: { isSocialLogin: isSocialLogin } })
      : navigate(isSocialLogin ? '/new/payment-verify' : '/new/email-verify')
  }

  const checkEmailExist = async (data) => {
    const { email, password, isSocial } = data
    if (!!data?.firstName) {
      setFirstName(data.firstName)
      setLastName(data.lastName)
    }
    let payload = isSocial
      ? { email, password, social: 1 }
      : { email, password }
    setLoadingOpen(true)
    await AuthService.register(payload, setLoadingOpen, () => setStep(1))
    dispatch(setAuthedAs({ ...authedAs, email, password }))
    setEmail(email)
    setPassword(password)
  }

  useEffect(() => {
    setUserName(email.split('@')[0])
  }, [email])
  return (
    <div
      dir={lng ? 'ltr' : 'rtl'}
      className="block lg:flex w-full h-[1143px] lg:h-[1024px] relative"
    >
      <div
        className={
          'bg-[#FED821] w-full lg:w-[45%] xl:w-[48%] h-[508px] lg:h-full flex flex-col lg:flex-row justify-start lg:justify-center items-center m-auto sm:pt-[82px] lg:pt-0 ' +
          (step === 0 || step === 9 ? 'pt-[40px]' : 'pt-[82px]')
        }
      >
        <div className="flex flex-col sm:flex-row-reverse lg:flex-col items-center justify-between w-[90%] mb:w-[360px] sm:w-[446px]">
          <img
            className="w-[80px] h-[80px] sm:w-[128px] lg:w-[191.76px] sm:h-[128px] lg:h-[191.76px]"
            src={step < 3 ? WelcomeIcon : WelcomeIcon_Green}
            alt="smile"
          />
          {step !== 1 ? (
            <h1
              className={`${
                lng
                  ? 'text-center sm:text-left lg:text-center'
                  : 'text-center sm:text-right lg:text-center'
              } mt-0 lg:mt-[30px] lg:mr-[0px] text-[40px] md:text-[51px] font-bold font-[almarai] leading-[60px] text-[#FEFEFE] w-auto sm:max-w-[330px]`}
            >
              {step === 0 ? t('signintitle12') : t('signintitle2')}
            </h1>
          ) : (
            <div className="mt-0 lg:mt-[22px] lg:mr-[0px] w-auto sm:max-w-[330px]">
              <h1
                className={`${
                  lng
                    ? 'text-center sm:text-left lg:text-center'
                    : 'text-center sm:text-right lg:text-center'
                }  text-[25px] md:text-[33px] font-bold font-[almarai] leading-[60px] text-[#FEFEFE]`}
              >
                {t('signuptitle11')}
              </h1>
              <h1
                className={`${
                  lng
                    ? 'text-center sm:text-left lg:text-center'
                    : 'text-center sm:text-right lg:text-center'
                }  text-[40px] md:text-[51px] font-bold font-[almarai] leading-[60px] text-[#FEFEFE]`}
              >
                {t('signuptitle12')}
              </h1>
            </div>
          )}
        </div>
      </div>
      <div className="bg-transparent w-full lg:min-w-[612px] lg:w-[55%] h-full absolute lg:relative top-0 flex lg:block justify-center">
        <div className="bg-transparent lg:bg-opacity-[0.7] lg:h-full flex flex-col items-center justify-start">
          {step === 0 && (
            <MainSignUpForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              checked={checked}
              setCheck={setCheck}
              onSubmit={checkEmailExist}
              setIsSocialLogin={setIsSocialLogin}
              isSocialLogin={isSocialLogin}
            />
          )}
          {step === 1 && (
            <UserNameForm
              step={step}
              setStep={setStep}
              userName={username}
              setUserName={setUserName}
            />
          )}
          {step === 2 && (
            <SelectAccountForm
              step={step}
              setStep={setStep}
              setAccountType={setAccountType}
            />
          )}
          {/* {step === 3 && (
            <LinkAccountForm
              setStep={setStep}
              step={step}
              setSocialLink={setSocialLink}
              accountType={accountType}
            />
          )} */}
          {step === 3 && (
            <ProfileDetail
              handleSave={handleRegister}
              firstName={firstName}
              setFName={setFirstName}
              lastName={lastName}
              setLName={setLastName}
              accountType={accountType}
            />
          )}
          <div
            dir="ltr"
            className={`font-[poppins] text-[12px] text-[#8d93a1] leading-[18px] font-[400] absolute ${
              lng ? 'right-[40px]' : 'left-[40px]'
            } bottom-[15px] mt-auto hidden lg:block`}
          >
            ©Copyright Readymade 2023
          </div>
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

export default SignUp
