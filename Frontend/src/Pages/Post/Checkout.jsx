import { useState, useEffect, useRef, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { card_format, date_format } from '../../Utils/Validation'
import Target from '../../Assests/Images/target.svg'
import Visa from '../../Assests/Images/visa.svg'
import Paypal from '../../Assests/Images/paypal.svg'
import Mastercard from '../../Assests/Images/mastercard.svg'
import Insurance from '../../Assests/Images/insurance.svg'
import { toast } from 'react-toast'

const Checkout = ({ onSubmit, paymentAmount, currencyType }) => {
  const paymentFee = useMemo(() => parseInt(paymentAmount / 20), [
    paymentAmount,
  ])
  const paypalRef = useRef()
  const { t } = useTranslation()
  const [paymentType, setPaymentType] = useState('credit')
  const [cardholderName, setCardholderName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cvc, setCvc] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    window?.paypal
      ?.Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: paymentAmount,
                  currency_code: currencyType,
                },
              },
            ],
          })
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (orderData) {
            // Successful capture! For demo purposes:
            var transaction = orderData.purchase_units[0].payments.captures[0]
            console.log(transaction)
          })
        },
        fundingSource: 'paypal',
      })
      .render(paypalRef.current)
  }, [paymentType])

  const handleSubmit = () => {
    if (!cardNumber || !cardholderName || !cvc || !date) {
      toast.error('please input correct card information')
      return
    }
    const payload = {
      cardholderName: cardholderName,
      cardNumber: cardNumber,
      cvc: cvc,
      date: date,
    }
    onSubmit(payload)
  }
  return (
    <div className="bg-lightgray p-5 lg:p-10">
      <div className="font-bold text-base lg:text-[22px]">
        {t('post.paymenttitle')}
      </div>
      <div className="flex flex-1 flex-col lg:flex-row gap-10 lg:gap-20 mt-5 lg:mt-10">
        <div className="w-full flex flex-col sm:flex-row gap-5 lg:gap-0 lg:flex-col lg:w-1/2">
          <div
            className="w-full flex flex-col justify-between"
            dir="ltr"
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <div className="bg-white border border-lightgreen rounded-md shadow-xl">
              <div className="flex flex-col justify-center mr-4 mb-2 lg:mb-4 py-2 lg:py-4 px-4 lg:px-8">
                <div className="flex justify-between flex-col">
                  <div className="flex justify-between items-end gap-5">
                    <div className="flex items-center w-2/3">
                      <input
                        type="radio"
                        id="radio1"
                        value="credit"
                        readOnly
                        className="hidden"
                        checked={paymentType === 'credit'}
                      />
                      <label
                        htmlFor="radio1"
                        className="flex items-center cursor-pointer font-bold lg:font-normal text-base lg:text-[17px]"
                        defaultValue="credit"
                      >
                        <span className="w-4 h-4 inline-block mr-2 rounded-full border border-grey"></span>
                        {t('post.debitorcredit')}
                      </label>
                    </div>
                    <div className="text-xs w-1/3">
                      {t('allmajorcardsaccepted')}
                    </div>
                  </div>
                  <div className="mt-5 flex justify-between gap-5">
                    <div className="w-2/3">
                      <label className="text-xs">{t('cardnumber')}</label>
                      <input
                        className="mt-2 bg-transparent border border-[#e8e8e8] h-12 w-full px-5"
                        value={card_format(cardNumber)}
                        onChange={(e) => {
                          if (e.target.value.length < 20)
                            setCardNumber(e.target.value)
                        }}
                      />
                    </div>
                    <div className="w-1/3">
                      <label className="text-xs">{t('expirydate')}</label>
                      <input
                        className="mt-2 bg-transparent border border-[#e8e8e8] h-12 w-full px-5"
                        placeholder="MM / YY"
                        value={date_format(date)}
                        onChange={(e) => {
                          if (e.target.value.length < 6) setDate(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex gap-5">
                    <div className="w-2/3">
                      <label className="text-xs">{t('cardholdername')}</label>
                      <input
                        className="mt-2 bg-transparent border border-[#e8e8e8] h-12 w-full px-5"
                        onChange={(e) => setCardholderName(e.target.value)}
                      />
                    </div>
                    <div className="w-1/3">
                      <label className="text-xs">{t('ccvcvv')}</label>
                      <input
                        className="mt-2 bg-transparent border border-[#e8e8e8] h-12 w-full px-5"
                        maxLength={3}
                        onChange={(e) => setCvc(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <img src={Visa} alt="Visa" />
                    <img src={Mastercard} alt="MasterCard" />
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-white border border-lightgreen rounded-md shadow-xl py-4 px-8 mt-2 relative">
              {' '}
              <div>
                <input
                  type="radio"
                  id="radio2"
                  value="paypal"
                  readOnly
                  className="hidden"
                  checked={paymentType === 'paypal'}
                />
                <label
                  htmlFor="radio2"
                  className="flex items-center cursor-pointer text-[17px]"
                >
                  <span className="w-4 h-4 inline-block mr-2 rounded-full border border-grey"></span>
                  Paypal
                </label>
              </div>
              <img src={Paypal} alt="Paypal" />
            </div>
          </div>
          <div
            className="mt-0 lg:mt-5 py-4 bg-white border border-lightgreen rounded-md shadow-xl"
            dir="ltr"
          >
            <div className="text-base lg:text-lg font-bold px-6 lg:px-8 mb-5">
              {t('verifiedpaymentbenefits')}
            </div>
            <div className="border-t-[1px] border-[#d1d1d1]">
              <div className="flex mx-5 mt-5 lg:my-10 lg:mx-14 gap-8 flex-col w-4/5 lg:w-2/3">
                <div className="flex gap-8 items-center">
                  <img src={Insurance} alt="insurance" />
                  <div className="flex flex-col gap-1 lg:gap-4">
                    <div className="text-lg font-bold">
                      {t('verifiedbadge')}
                    </div>
                    <div className="text-[10px]">{t('verifiedbadgebrief')}</div>
                  </div>
                </div>
                <div className="flex gap-8 items-center">
                  <img src={Target} alt="Target" />
                  <div className="flex flex-col gap-1 lg:gap-4">
                    <div className="text-lg font-bold">
                      {t('concentreonsuccess')}
                    </div>
                    <div className="text-[10px]">
                      {t('concentreonsuccessbrief')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-lightgreen rounded-md shadow-xl py-5 lg:py-16 px-5 w-full lg:w-1/2">
          <div className="flex justify-between text-base text-[17px] font-[Poppins] font-bold lg:font-normal">
            <div>{t('post.item')}</div>
            <div>{t('post.amount')}</div>
          </div>
          <div className="mt-2 h-[1px] w-full bg-gray"></div>
          <div className="flex justify-between items-center">
            <div className="text-lightgray2 text-sm lg:text-[15px]">
              <div>{t('post.recruiterupgrade')}</div>
              <div className="text-[11px] lg:text-xs">
                {t('post.projectupgrade')}
              </div>
            </div>
            <div className="text-base font-bold lg:font-normal" dir="ltr">
              $ {paymentAmount} {currencyType}
            </div>
          </div>
          <div className="flex justify-between items-center mt-10 lg:mt-20">
            <div className="text-[13px]">{t('post.processingfee')}</div>
            <div className="text-base font-bold lg:font-normal" dir="ltr">
              $ {paymentFee} {currencyType}
            </div>
          </div>
          <div className="my-2 h-[1px] w-full bg-gray"></div>
          <div className="flex justify-between font-bold lg:font-normal">
            <div className="text-base lg:text-[17px]">{t('post.total')}</div>
            <div className="text-base" dir="ltr">
              $ {paymentAmount + paymentFee} {currencyType}
            </div>
          </div>
          <div
            className={`top-0 left-0 w-full z-10 opacity-0 ${
              paymentType === 'paypal' ? 'absolute' : 'hidden'
            }`}
            ref={paypalRef}
          ></div>
          <div
            className="relative mt-10 mb-5 lg:my-20 w-1/2 m-auto lg:w-full font-bold lg:font-normal text-center py-2 bg-green text-white cursor-pointer"
            dir="ltr"
            onClick={handleSubmit}
          >
            <span className="z-10">
              {t('post.confirmandpay')} $ {paymentAmount + paymentFee}{' '}
              {currencyType}
            </span>
          </div>
          <div className="text-xs text-center lg:text-left">
            {t('post.youagreeauthorize')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
