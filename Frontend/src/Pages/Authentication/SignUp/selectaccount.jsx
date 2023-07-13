import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { USER_TYPE } from '../../../Services/constants/accountType'
import LogoEn from '../../../Assests/Images/logo_en.png'
import LeftBitIcon_Green from '../../../Assests/Images/leftbit_green.png'
import FreelancerIcon from '../../../Assests/Images/freelancer.png'
import ClientIcon from '../../../Assests/Images/client.png'
import RightArrow_Yellow from '../../../Assests/Images/rightarrow_yellow.png'
import { setAuthedAs } from '../../../Services/reducers/authSlice'
import i18n from '../../../i18n'

const SelectAccount = ({ setStep, step, setAccountType }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const authedAs = useSelector((state) => state.authedAs)
  const lng = i18n.language === 'en' ? true : false
  const [showPopup, setShowPopup] = useState(false)
  const handleNext = (type) => {
    dispatch(setAuthedAs({ ...authedAs, userType: type }))
    setAccountType(type)
    setStep(step + 1)
  }

  return (
    <div
      className={`w-full lg:w-[52%] h-full flex justify-start lg:justify-center items-center flex-col mt-[347px] lg:mt-0 ${
        lng ? 'font-[poppins]' : 'font-[almarai]'
      }`}
    >
      <div className="w-[90%] sm:w-[372px] h-[503px] flex flex-col items-center bg-white filter px-[19px] py-[28px] relative">
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
          {t('selectacounttype')}
        </h1>
        <h3 className="text-[12px] leading-[18px] text-[#312f2f] mt-[20px] w-full">
          {t('dontworry')}
        </h3>
        <div className="flex flex-col justify-center gap-y-[40px] w-full  mt-[25px]">
          <div
            onClick={() => handleNext(USER_TYPE.Freelancer)}
            className={`flex justify-between items-center ${
              lng ? 'pl-[17px] pr-[23px]' : 'pr-[17px] pl-[23px]'
            }  w-full bg-white drop-shadow-custom h-[97px] rounded-[10px] filter cursor-pointer`}
          >
            <img src={FreelancerIcon} alt="freelancer" />
            <h1 className="text-[#07122f] text-[19px] leading-[31px] font-bold">
              {t('wantwork')}
            </h1>
            <img
              src={RightArrow_Yellow}
              alt="rightallow_yellow"
              className={`transform ${lng ? 'scale-x-[1]' : 'scale-x-[-1]'}`}
            />
          </div>
          <div
            onClick={() => setShowPopup(!showPopup)}
            className={`flex justify-between items-center ${
              lng ? 'pl-[17px] pr-[23px]' : 'pr-[17px] pl-[23px]'
            }  w-full bg-white drop-shadow-custom h-[97px] rounded-[10px] filter cursor-pointer`}
          >
            <img src={ClientIcon} alt="freelancer" />
            <h1 className="text-[#07122f] text-[19px] leading-[31px] font-bold">
              {t('wanthire')}
            </h1>
            <img
              src={RightArrow_Yellow}
              alt="rightallow_yellow"
              className={`transform ${lng ? 'scale-x-[1]' : 'scale-x-[-1]'}`}
            />
          </div>
        </div>
        <div className="w-full">
          {showPopup && (
            <div className={`mt-5 flex flex-col items-end transition-all`}>
              <Button
                className={`${
                  lng ? 'font-[poppins]' : 'font-[almarai]'
                }  normal-case w-[231px] h-[40px] bg-[#009800] flex justify-center items-center cursor-pointer text-[15px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
                onClick={() => handleNext(USER_TYPE.Company)}
              >
                {t('company')}
              </Button>
              <Button
                className={`${
                  lng ? 'font-[poppins]' : 'font-[almarai]'
                }  mt-2 normal-case w-[231px] h-[40px] bg-[#009800] flex justify-center items-center cursor-pointer text-[15px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
                onClick={() => handleNext(USER_TYPE.Customer)}
              >
                {t('individual')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SelectAccount
