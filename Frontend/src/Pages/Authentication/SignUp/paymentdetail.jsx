import { useState } from 'react'
import { Button, Select, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import LogoEn from '../../../Assests/Images/logo_en.png'
import VisaIcon from '../../../Assests/Images/visa.png'
import MasterCardIcon from '../../../Assests/Images/mastercard.png'
import PayPalIcon from '../../../Assests/Images/paypal_icon.png'
import InSuranceIcon from '../../../Assests/Images/insurance.png'
import ConcentrateIcon from '../../../Assests/Images/concentrate.png'

import i18n from '../../../i18n'

const NewIcon = (props) => (
  <svg
    {...props}
    className="mr-[14px]"
    xmlns="https://www.w3.org/2000/svg"
    width="14.491"
    height="14.246"
    viewBox="1750.897 819.8 14.491 7.246"
  >
    <g data-name="Frame 2">
      <path
        d="m1750.897 819.8 7.246 7.246 7.246-7.246"
        stroke-linejoin="round"
        stroke-linecap="round"
        strokeWidth="2"
        stroke="#009c00"
        fill="transparent"
        data-name="Vector 3"
      />
    </g>
  </svg>
)

const PaymentDetail = () => {
  const navigate = useNavigate()
  const [cardNumber, setCardNumber] = useState('')
  const [date, setDate] = useState('')
  const [holderName, setHolerName] = useState('')
  const [cv, setCV] = useState('')
  const [currency, setCurrency] = useState(0)
  const currencies = ['US dollar', 'Canada dollar']

  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false

  return (
    <div
      className={`${
        lng ? 'font-[poppins]' : 'font-[almarai]'
      } w-full lg:w-[52%] h-full flex justify-start lg:justify-center items-center flex-col mt-[78px] lg:mt-0`}
    >
      <div className="w-[100%] sm:w-[554px] h-fit sm:h-[948px] flex flex-col items-center bg-white filter drop-shadow-custom1 px-[35px] pt-[18px] pb-[26px]">
        <div className="flex w-full justify-between sm:items-end sm:flex-row flex-col-reverse items-center">
          <div className="text-[#07122F] text-[12px] sm:text-[20px] leading-[26px] font-bold">
            {t('addverifiedpaymentmethod')}
          </div>
          <img src={LogoEn} alt="Logo" className="w-[132px] h-[43px]" />
        </div>
        <div className="mt-[30px] w-[100%] sm:w-[490px] h-fit sm:h-[290px] border-solid border-[#009400] bg-white border-[1px] rounded-[10px] pt-[18px] pb-[15px] pl-[10px] pr-[10px] sm:pl-[26px] sm:pr-[19px]">
          <div className="flex justify-between sm:flex-row flex-col gap-y-[10px]">
            <div className="flex gap-x-[6px]">
              <div className="h-[19px] w-[19px] rounded-full border-[#009c00] border-[6px]"></div>
              <div className="text-[#07122F] text-[12px] sm:text-[17px] leading-[19px] font-bold">
                Debit or credit card
              </div>
            </div>
            <div className="text-[#07122F] text-[10px] sm:text-[12px] leading-[15px] font-[500]">
              {t('allmajorcardsaccepted')}
            </div>
          </div>
          <div className="flex justify-between mt-[20px] sm:flex-row flex-col gap-y-[10px]">
            <div className="sm:w-[272px] w-full">
              <h1 className="text-[10px] sm:text-[12px] leading-[15px] text-[#312f2f] font-[500] w-full">
                {t('cardnumber')}
              </h1>
              <input
                value={cardNumber}
                onChange={(e) => {
                  setCardNumber(e.target.value)
                }}
                className="w-full border-solid border-[1px] border-[#e8e8e8] focus:outline-none mt-[11px] bg-[#7c957f] bg-opacity-5 h-[36px] sm:h-[48px] py-[19px] px-[16px] text-[10px] sm:text-[14px] text-[#b1bbc6] leading-[21px]"
                type="text"
                placeholder=""
              />
            </div>
            <div className="sm:w-[166px] w-full">
              <h1 className="w-full text-[10px] sm:text-[12px] leading-[15px] text-[#312f2f] font-[500] max-w-[151px]">
                {t('expirydate')}
              </h1>
              <input
                value={date}
                onChange={(e) => {
                  setDate(e.target.value)
                }}
                className="w-full border-solid border-[1px] border-[#e8e8e8] focus:outline-none mt-[11px] bg-[#7c957f] bg-opacity-5 h-[36px] sm:h-[48px] py-[19px] px-[16px] text-[10px] sm:text-[14px] text-[#b1bbc6] leading-[21px]"
                type="text"
                placeholder="MM / YY"
              />
            </div>
          </div>
          <div className="flex justify-between mt-[19px] sm:flex-row flex-col gap-y-[10px]">
            <div className="sm:w-[272px] w-full">
              <h1 className="w-full text-[10px] sm:text-[12px] leading-[15px] text-[#312f2f] font-[500]">
                {t('cardholdername')}
              </h1>
              <input
                value={holderName}
                onChange={(e) => {
                  setHolerName(e.target.value)
                }}
                className="w-full border-solid border-[1px] border-[#e8e8e8] focus:outline-none mt-[11px] bg-[#7c957f] bg-opacity-5  h-[36px] sm:h-[48px] py-[19px] px-[16px] text-[10px] sm:text-[14px] text-[#b1bbc6] leading-[21px]"
                type="text"
                placeholder=""
              />
            </div>
            <div className="sm:w-[166px] w-full">
              <h1 className="text-[10px] sm:text-[12px] leading-[15px] text-[#312f2f] font-[500] max-w-[151px]">
                CVC/CVV:
              </h1>
              <input
                value={cv}
                onChange={(e) => {
                  setCV(e.target.value)
                }}
                className="w-full border-solid border-[1px] border-[#e8e8e8] focus:outline-none mt-[11px] bg-[#7c957f] bg-opacity-5 h-[36px] sm:h-[48px] py-[19px] px-[16px] text-[10px] sm:text-[14px] text-[#b1bbc6] leading-[21px]"
                type="text"
                placeholder=""
              />
            </div>
          </div>
          <div className="sm:ml-[20px] flex gap-x-[9px] mt-[14px]">
            <img src={VisaIcon} alt="visaicon" />
            <img src={MasterCardIcon} alt="mastercard" />
          </div>
        </div>
        <div className="mt-[6px]  w-[100%] sm:w-[490px] h-[51px] drop-shadow-custom bg-white rounded-[10px] pt-[18px] pb-[15px]  pl-[10px] pr-[10px] sm:pl-[26px] sm:pr-[19px]">
          <div className="flex justify-between">
            <div className="flex gap-x-[6px]">
              <div className="h-[19px] w-[19px] rounded-full border-[#009c00] border-[1px]"></div>
              <div className="text-[#07122F] text-[12px] sm:text-[17px] leading-[19px] font-[500]">
                PayPal
              </div>
            </div>
            <img src={PayPalIcon} alt="paypal_icon" />
          </div>
        </div>
        <div className="mt-[30px]  w-[100%] sm:w-[490px] h-fit sm:h-[276px] border-solid border-[#009400] bg-white border-[1px] rounded-[10px] pt-[18px] pb-[15px]">
          <h1 className="text-[#07122F] text-[12px] sm:text-[18px] leading-[27px] font-bold pl-[10px] sm:pl-[26px] pr-[19px]">
            {t('verifiedbadge')}
          </h1>
          <div className="w-full border-solid border-[1px] border-[#d1d1d1]"></div>
          <div className="flex justify-start mt-[20px] pl-[10px] sm:pl-[55px] pr-[19px] items-center gap-x-[40px]">
            <div>
              <img src={InSuranceIcon} alt="insurance" />
            </div>

            <div className="flex flex-col gap-y-[15px]">
              <h1 className="text-[12px] sm:text-[18px] leading-[20px] sm:leading-[26px] text-[#07122f] font-bold">
                {t('verifiedbadge')}
              </h1>
              <h1 className="text-[8px] sm:text-[10px] leading-[12px] sm:leading-[15px] text-[#07122f] font-[500] max-w-[208px]">
                {t('verifiedbadgebrief')}
              </h1>
            </div>
          </div>
          <div className="flex justify-start mt-[10px] sm:mt-[20px] pl-[10px] sm:pl-[55px] pr-[19px] items-center gap-x-[40px]">
            <div>
              <img src={ConcentrateIcon} alt="concentrate" />
            </div>

            <div className="flex flex-col gap-y-[15px]">
              <h1 className="text-[12px] sm:text-[18px] leading-[20px] sm:leading-[26px] text-[#07122f] font-bold">
                {t('concentreonsuccess')}
              </h1>
              <h1 className="text-[8px] sm:text-[10px] leading-[12px] sm:leading-[15px] text-[#07122f] font-[500] max-w-[208px]">
                {t('concentreonsuccessbrief')}
              </h1>
            </div>
          </div>
        </div>
        <div className=" flex flex-col mt-[13px]  w-[100%] sm:w-[490px] items-center h-[175px] drop-shadow-custom bg-white rounded-[10px] pt-[18px] pb-[15px] sm:pl-[26px] sm:pr-[19px] pl-[10px] pr-[10px]">
          <div className="flex justify-between items-center w-full">
            <div className="text-[#07122F] text-[12px] sm:text-[17px] leading-[15px] sm:leading-[19px] font-[500]">
              {t('cardcurrency')}
            </div>
            <Select
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value)
              }}
              displayEmpty="displayEmpty"
              className="max-w-[260px] h-[39px] pl-[19px] text-[#665c79] bg-[#7c95b1] bg-opacity-10 border-solid border-[1px] border-[#e8e8e8]"
              inputProps={{
                'aria-label': 'Without label',
              }}
              IconComponent={NewIcon}
              MenuProps={{
                sx: {
                  '& .MuiMenuItem-root:hover': {
                    backgroundColor: 'rgba(23, 104, 110, 0.11)',
                  },
                  '& .MuiMenuItem-root': {
                    whiteSpace: 'normal',
                  },
                },
              }}
            >
              {
                //dynamic
                currencies.map((item, index) => {
                  return (
                    <MenuItem value={index}>
                      <p className="whitespace-nowrap font-normal text-[10px] sm:text-[14px]">
                        {item}
                      </p>
                    </MenuItem>
                  )
                })
              }
            </Select>
          </div>

          <Button
            className={`${
              lng ? 'font-[poppins]' : 'font-[almarai]'
            } mt-[31px] normal-case w-[231px] h-[40px] bg-[#009800] flex justify-center items-center cursor-pointer text-[15px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
            onClick={() => navigate('/signin')}
          >
            {t('verifypaymentmethod')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PaymentDetail
