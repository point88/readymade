import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AuthService from '../../../Services/auth'
import LeftBitIcon_Green from '../../../Assests/Images/leftbit_green.png'
import LogoEn from '../../../Assests/Images/logo_en.png'
import i18n from '../../../i18n'

export default ({ setLoadingOpen }) => {
  const navigate = useNavigate()
  const { email } = useParams()
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  const handleResend = async () => {
    setLoadingOpen(true)
    await AuthService.sendNewPassword(email, setLoadingOpen)
  }
  const handleSend = async () => {
    navigate('/reset-password')
  }
  return (
    <div
      className={`w-full lg:w-[52%] h-full flex justify-start lg:justify-center items-center flex-col mt-[347px] lg:mt-0 ${
        lng ? 'font-[poppins]' : 'font-[Almarai]'
      }`}
    >
      <div className="w-[90%] sm:w-[372px] h-fit sm:h-[503px] flex flex-col justify-between items-center bg-white filter drop-shadow-lg px-[36px] py-[25.6px] relative">
        <div className="relative w-full flex justify-center">
          <img
            src={LogoEn}
            alt="Logo"
            className="w-[150px] mb:w-[176px] h-[57px]"
          />
          <img
            src={LeftBitIcon_Green}
            alt="LeftBit"
            className="w-[8px] h-[16px] absolute left-0 bottom-1 cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>
        <div>
          <h1 className="mt-[25.2px] text-[19px] leading-[36px] font-bold text-[#07122f] text-center">
            {t('passwordsent')}
          </h1>
          <div className="mt-[9px] h-fit sm:h-[62px] w-full mb:w-[309px] lg:w-full">
            <div className="text-[12px] leading-[18px] text-[#312F2F] font-[500] text-center">
              {t('emailhasbeensent')} {email}{' '}
              <span className="text-[12px] leading-[18px] text-[#312F2F] font-[500]">
                {t('verifynotice2')}
              </span>
            </div>
          </div>
          <div
            className={`mt-[14px] w-full flex cursor-pointer ${
              lng ? 'justify-end' : 'justify-start'
            }`}
            onClick={handleResend}
          >
            <h1 className="text-[12px] sm:text-[15px] text-[#009C00] leading-[18px] font-[500]">
              {t('didnotgetemail')}
            </h1>
          </div>
        </div>
        {/* <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border-none focus:outline-none mt-[10px] bg-[#7c957f] bg-opacity-5 w-full mb:w-[300px] h-[53px] py-[19px] px-[16px] text-[14px] text-[#b1bbc6] leading-[21px]"
          type="text"
          placeholder={t('digitcode')}
        /> */}
        <div
          className="mt-5 w-full mb:w-[300px] h-[60px] flex justify-center bg-[#009800] items-center cursor-pointer"
          onClick={() => {
            setLoadingOpen(true)
            handleSend()
          }}
        >
          <h1 className="text-[18px] text-white font-[500]">
            {t('enternewpassword')}
          </h1>
        </div>
      </div>
    </div>
  )
}
