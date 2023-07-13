import { useTranslation } from 'react-i18next'
import LogoEn from '../../Assests/Images/logo_en.png'
import { IconsList } from '../../Services/constants/FooterLinks'
import { FooterIcon } from '../../Components/Icons'
import DiscordIcon from '../../Assests/Images/discord.svg'
import i18n from '../../i18n'

export default function Header() {
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  return (
    <>
      <div className="bg-white px-[91px] pt-[72px] pb-[130px] hidden xl:flex flex-row">
        <div className="w-[40%] flex flex-col justify-between">
          <img src={LogoEn} alt="Logo" className="w-[200px] h-[71px]" />
          <p
            className="text-[14px] text-gray w-[432px]"
            dir={lng ? 'rtl' : 'rtl'}
          >
            {t('footer.description')}
          </p>
          <div className="flex gap-x-[21px] pt-[20px]">
            {IconsList.map((obj, index) => (
              <div key={index}>
                <FooterIcon key={index} src={obj.src} route={obj.route} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-[60%] flex justify-around">
          <div>
            <p
              className="text-darkblue text-[17px] sm:text-[23px] xl:text-[17px] py-[43px]"
              dir={lng ? 'rtl' : 'rtl'}
            >
              {t('footer.company')}
            </p>
            <div>
              <div className="flex my-[13px]">
                <img
                  className="w-[25px] h-[25px] mr-[10px]"
                  src={DiscordIcon}
                  alt=""
                />
                <p
                  className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]"
                  dir={lng ? 'rtl' : 'rtl'}
                >
                  {t('footer.aboutUs')}
                </p>
              </div>
              <div className="flex my-[13px]">
                <img
                  className="w-[25px] h-[25px] mr-[10px]"
                  src={DiscordIcon}
                  alt=""
                />
                <p
                  className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]"
                  dir={lng ? 'rtl' : 'rtl'}
                >
                  {t('footer.features')}
                </p>
              </div>
              <div className="flex my-[13px]">
                <img
                  className="w-[25px] h-[25px] mr-[10px]"
                  src={DiscordIcon}
                  alt=""
                />
                <p
                  className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]"
                  dir={lng ? 'rtl' : 'rtl'}
                >
                  {t('footer.howItWorks')}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p
              className="text-darkblue text-[17px] sm:text-[23px] xl:text-[17px] py-[43px]"
              dir={lng ? 'rtl' : 'rtl'}
            >
              {t('footer.faq')}
            </p>
            <div>
              <div className="flex my-[13px]">
                <img
                  className="w-[25px] h-[25px] mr-[10px]"
                  src={DiscordIcon}
                  alt=""
                />
                <p
                  className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]"
                  dir={lng ? 'rtl' : 'rtl'}
                >
                  {t('footer.contact')}
                </p>
              </div>
              <div className="flex my-[13px]">
                <img
                  className="w-[25px] h-[25px] mr-[10px]"
                  src={DiscordIcon}
                  alt=""
                />
                <p
                  className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]"
                  dir={lng ? 'rtl' : 'rtl'}
                >
                  {t('footer.shopping')}
                </p>
              </div>
              <div className="flex my-[13px]">
                <img
                  className="w-[25px] h-[25px] mr-[10px]"
                  src={DiscordIcon}
                  alt=""
                />
                <p
                  className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]"
                  dir={lng ? 'rtl' : 'rtl'}
                >
                  {t('footer.aboutUs')}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p
              className="text-darkblue text-[17px] sm:text-[23px] xl:text-[17px] py-[43px]"
              dir={lng ? 'rtl' : 'rtl'}
            >
              {t('footer.contactUs')}
            </p>
            <div className="flex flex-col justify-between">
              <p
                className="text-gray text-[13px] sm:text-[16px] xl:text-[15px] mt-[13px]"
                dir={lng ? 'rtl' : 'rtl'}
              >
                {t('footer.adress1')} <br />
                {t('footer.adress2')}
              </p>
              <p
                className="text-gray text-[13px] sm:text-[16px] xl:text-[15px] mb-[13px]"
                dir={lng ? 'rtl' : 'rtl'}
              >
                {t('footer.adress3')}
              </p>
              <p
                className="text-gray text-[13px] sm:text-[16px] xl:text-[15px] my-[36px]"
                dir={lng ? 'rtl' : 'rtl'}
              >
                {t('footer.companyPhone')}
              </p>
              <p
                className="text-gray text-[13px] sm:text-[16px] xl:text-[15px] my-[13px]"
                dir={lng ? 'rtl' : 'rtl'}
              >
                {t('footer.comapnyEmail')}{' '}
                <span className="text-darkgreen1">info@arkanpro.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white px-[25px] pt-[20px] pb-[45px] hidden sm:block xl:hidden w-full">
        <p className="text-[14px] text-gray leading-[35px]">
          {t('footer.description')}
        </p>
        <div className="flex my-2">
          <div className="w-[50%] flex flex-col justify-between">
            <img src={LogoEn} alt="Logo" className="w-[200px] h-[71px]" />
            <p className="text-gray text-[13px] sm:text-[16px] xl:text-[15px]">
              {t('footer.companyPhone')}
            </p>
            <p className="text-gray text-[13px] sm:text-[16px] xl:text-[15px]">
              {t('footer.comapnyEmail')}{' '}
              <span className="text-darkgreen1">info@arkanpro.com</span>
            </p>
            <div className="flex gap-x-[21px] pt-[20px]">
              {IconsList.map((obj, index) => (
                <div key={index}>
                  <FooterIcon key={index} src={obj.src} route={obj.route} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-[50%] flex justify-around">
            <div className="w-[50%]">
              <p className="text-darkblue text-[17px] sm:text-[23px] xl:text-[17px] py-[37px]">
                {t('footer.company')}
              </p>
              <div>
                <div className="flex my-[13px]">
                  <img
                    className="w-[25px] h-[25px] mr-[10px]"
                    src={DiscordIcon}
                    alt=""
                  />
                  <p className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]">
                    {t('footer.aboutUs')}
                  </p>
                </div>
                <div className="flex my-[13px]">
                  <img
                    className="w-[25px] h-[25px] mr-[10px]"
                    src={DiscordIcon}
                    alt=""
                  />
                  <p className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]">
                    {t('footer.features')}
                  </p>
                </div>
                <div className="flex my-[13px]">
                  <img
                    className="w-[25px] h-[25px] mr-[10px]"
                    src={DiscordIcon}
                    alt=""
                  />
                  <p className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]">
                    {t('footer.howItWorks')}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[50%]">
              <p className="text-darkblue text-[17px] sm:text-[23px] xl:text-[17px] py-[37px]">
                {t('footer.policy')}
              </p>
              <div>
                <div className="flex my-[13px]">
                  <img
                    className="w-[25px] h-[25px] mr-[10px]"
                    src={DiscordIcon}
                    alt=""
                  />
                  <p className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]">
                    {t('footer.faq')}
                  </p>
                </div>
                <div className="flex my-[13px]">
                  <img
                    className="w-[25px] h-[25px] mr-[10px]"
                    src={DiscordIcon}
                    alt=""
                  />
                  <p className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]">
                    {t('footer.contact')}
                  </p>
                </div>
                <div className="flex my-[13px]">
                  <img
                    className="w-[25px] h-[25px] mr-[10px]"
                    src={DiscordIcon}
                    alt=""
                  />
                  <p className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]">
                    {t('footer.shopping')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-darkblue text-[17px] sm:text-[23px] xl:text-[17px]">
            {t('footer.contactUs')}
          </p>
          <p
            className="text-gray text-[13px] sm:text-[16px] xl:text-[15px] ml-3"
            dir={lng ? 'rtl' : 'rtl'}
          >
            {t('footer.fullAdress')}
          </p>
        </div>
      </div>
      <div className="bg-white px-[25px] pt-[20px] pb-[25px] block sm:hidden w-full">
        <p className="text-[10px] text-gray leading-[17px]">
          {t('footer.description')}
        </p>
        <div className="w-full flex justify-around">
          <div className="w-[50%]">
            <p className="text-darkblue text-[15px] sm:text-[23px] xl:text-[17px] py-[15px]">
              {t('footer.company')}
            </p>
            <div>
              <div className="flex my-[13px]">
                <img
                  className="w-[25px] h-[25px] mr-[10px]"
                  src={DiscordIcon}
                  alt=""
                />
                <p className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]">
                  {t('footer.aboutUs')}
                </p>
              </div>
              <div className="flex my-[13px]">
                <img
                  className="w-[25px] h-[25px] mr-[10px]"
                  src={DiscordIcon}
                  alt=""
                />
                <p className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]">
                  {t('footer.features')}
                </p>
              </div>
              <div className="flex my-[13px]">
                <img
                  className="w-[25px] h-[25px] mr-[10px]"
                  src={DiscordIcon}
                  alt=""
                />
                <p className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]">
                  {t('footer.howItWorks')}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[50%]">
            <p className="text-darkblue text-[15px] sm:text-[23px] xl:text-[17px] py-[15px]">
              {t('footer.policy')}
            </p>
            <div>
              <div className="flex my-[13px]">
                <img
                  className="w-[25px] h-[25px] mr-[10px]"
                  src={DiscordIcon}
                  alt=""
                />
                <p className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]">
                  {t('footer.faq')}
                </p>
              </div>
              <div className="flex my-[13px]">
                <img
                  className="w-[25px] h-[25px] mr-[10px]"
                  src={DiscordIcon}
                  alt=""
                />
                <p className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]">
                  {t('footer.contact')}
                </p>
              </div>
              <div className="flex my-[13px]">
                <img
                  className="w-[25px] h-[25px] mr-[10px]"
                  src={DiscordIcon}
                  alt=""
                />
                <p className="text-gray text-[13px] sm:text-[16px] xl:text-[21px]">
                  {t('footer.shopping')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[180px] flex flex-col justify-between my-2">
          <img src={LogoEn} alt="Logo" className="w-[119px] h-[42px]" />
          <p className="text-darkblue text-[15px] sm:text-[23px] xl:text-[17px] mt-[12px] mb-[15px]">
            {t('footer.contactUs')}
          </p>
          <p className="text-gray text-[13px] sm:text-[16px] xl:text-[15px] mb-[10px]">
            {t('footer.companyPhone')}
          </p>
          <p className="text-gray text-[13px] sm:text-[16px] xl:text-[15px] mb-[10px] whitespace-nowrap">
            {t('footer.companyEmail')}{' '}
            <span className="text-darkgreen1">info@arkanpro.com</span>
          </p>
          <div className="flex gap-x-[21px] pt-[0px]">
            {IconsList.map((obj, index) => (
              <div key={index}>
                <FooterIcon key={index} src={obj.src} route={obj.route} />
              </div>
            ))}
          </div>
          <p className="text-gray text-[13px] sm:text-[16px] xl:text-[15px]">
            {/* 455 West Orchard Street Kings Mountain, NC 28086 */}
            {t('footer.resumedAdress')}
          </p>
        </div>
      </div>
    </>
  )
}
