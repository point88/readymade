import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LogoEn from '../../Assests/Images/logo_en.png'
import { useNavigate } from 'react-router-dom'
import { LinksEn } from '../../Services/constants/HeaderLinks'
import { HeaderLink, HeaderLinkMobile } from '../../Components/Links'
import { SignButton } from '../../Components/Buttons'
import HamburgerIcon from '../../Assests/Images/hamburger.png'
import useWindowSize from '../../Utils/Hooks/useWindowSize'
import AuthService from '../../Services/auth'
import { ReactComponent as ArrowDown } from '../../Assests/Images/arrown-down.svg'
import i18n from '../../i18n'

export default function Header() {
  const navigate = useNavigate()
  const [navbar, setNavbar] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  const { width } = useWindowSize()
  const isAuthed = AuthService.isSigned()
  const user = AuthService.getUser()
  const isClient = !user?.freelancerId
  const headerList =
    isClient && isAuthed
      ? LinksEn
      : LinksEn.filter((links) => links.title !== 'postproject')
  const username = !!user?.companyName
    ? user?.companyName
    : user?.first_name + ' ' + user?.last_name

  const logout = () => {
    setShowProfileMenu(false)
    localStorage.clear()
    navigate('/')
  }

  return (
    <div
      dir={lng || width < 1280 ? 'ltr' : 'rtl'}
      className={
        'w-full bg-[#EDEFF1] z-[10000] fixed max-w-[1920px] top-0 ' +
        (lng ? 'font-[Poppins]' : 'font-[Almarai]')
      }
    >
      <div
        className={
          'w-full h-[62px] sm:h-[94px] xl:h-[135px] flex justify-between ' +
          (lng
            ? 'pr-[27.17px] pl-[26px] sm:pr-[22px] sm:pl-[52px] xl:pr-[34px] xl:pl-[94px]'
            : 'pr-[27.17px] pl-[26px] sm:pr-[22px] sm:pl-[52px] xl:pr-[86px] xl:pl-[73px]')
        }
      >
        <img
          src={HamburgerIcon}
          alt="hamburger"
          className="hidden cursor-pointer w-[29.66px] h-[20.67px] sm:w-[40.61px] sm:h-[28.4px] my-auto"
          onClick={() => setNavbar(!navbar)}
        />
        <div className="flex w-auto justify-between mt-[13.63px] sm:mt-[15px] xl:mt-[37.23px] ">
          <div
            className="cursor-pointer selcet-none"
            onClick={() => {
              navigate('/')
            }}
          >
            <img
              src={LogoEn}
              alt="Logo"
              className="w-[104.3px] h-[37px] sm:w-[141px] sm:h-[50px] xl:w-[203px] xl:h-[72px]"
            />
          </div>
        </div>
        {
          !navbar ? (
            <div className="flex xl:ml-[0px] justify-center xl:justify-end items-center ">
              <div className="gap-x-[33px] xl:gap-x-[53px] items-center hidden xl:flex">
                <div className="flex gap-x-[24px]">
                  {headerList.map((obj, index) => (
                    <div key={index}>
                      <HeaderLink title={t(obj.title)} route={obj.route} />
                    </div>
                  ))}
                </div>
                <div className="flex gap-x-[12px] xl:gap-x-[16px] items-center">
                  {!isAuthed ? (
                    <>
                      <div
                        className="text-[14px] xl:text-[18px] text-green cursor-pointer"
                        onClick={() => {
                          navigate('/signup')
                        }}
                      >
                        {t('signup')}
                      </div>
                      <SignButton title={t('signin')} route="/signin" />
                    </>
                  ) : (
                    <div className="relative">
                      <div
                        className="flex items-center justify-center cursor-pointer"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                      >
                        <ArrowDown className="mt-2" />
                        <div className="text-lg text-green mr-3">
                          {username}
                        </div>
                        <img
                          className="w-[40px] h-[40px] rounded-full"
                          src={user?.profile_image}
                          alt="Avatar"
                        />
                      </div>
                      {showProfileMenu && (
                        <div className="absolute left-4 top-10 transtransform -translate-x-1/2  bg-white w-[200px] py-2 rounded-md border border-lightgreen cursor-pointer">
                          <div className="pl-5 mt-5 flex items-center justify-start cursor-pointer">
                            <img
                              className="w-[40px] h-[40px] rounded-full"
                              src={user?.profile_image}
                              alt="Avatar"
                            />
                            <div className="text-lg text-green ml-3">
                              {username}
                            </div>
                          </div>
                          <div className="mt-5 pl-5 mb-2 font-bold text-md">
                            Account
                          </div>
                          <div
                            className="py-1 pl-5 text-md hover:bg-lightgray"
                            onClick={() => navigate('edit-profile')}
                          >
                            View profile
                          </div>
                          <div className="py-1 pl-5 text-md hover:bg-lightgray">
                            Membership
                          </div>
                          <div className="py-1 pl-5 text-md hover:bg-lightgray">
                            Account analytics
                          </div>
                          <div className="py-1 pl-5 text-md hover:bg-lightgray">
                            Bid insights
                          </div>
                          <div className="py-1 pl-5 text-md hover:bg-lightgray">
                            Settings
                          </div>
                          <div
                            onClick={logout}
                            className="pl-5 mb-2 text-md hover:bg-lightgray text-lightgreen hover:text-"
                          >
                            Log out
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div
                dir={lng ? 'ltr' : 'rtl'}
                className="xl:hidden fixed top-0 right-0 h-screen w-[200px] sm:w-[272px] overflow-hidden bg-white z-[20001] transition-all duration-300 ease-in flex flex-col pt-[30px]"
              >
                {headerList.map((obj, index) => (
                  <div key={index}>
                    <HeaderLinkMobile title={t(obj.title)} route={obj.route} />
                  </div>
                ))}
                {!isAuthed && (
                  <div
                    className={
                      'text-[18px] text-green py-[8px] px-[20px] cursor-pointer'
                    }
                    onClick={() => navigate('/signup')}
                  >
                    {t('signup')}
                  </div>
                )}
                {isAuthed ? (
                  <>
                    <div
                      className="flex items-center ml-5 cursor-pointer"
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                    >
                      <div className="text-lg text-green mr-3">{username}</div>
                      <img
                        className="w-[40px] h-[40px] rounded-full"
                        src={user?.profile_image}
                        alt="Avatar"
                      />
                    </div>
                    {showProfileMenu && (
                      <div className="bg-white w-[200px] py-2 cursor-pointer">
                        <div className="mt-5 pl-5 mb-2 font-bold text-md">
                          Account
                        </div>
                        <div
                          className="py-1 pl-5 text-md hover:bg-lightgray"
                          onClick={() => navigate('edit-profile')}
                        >
                          View profile
                        </div>
                        <div className="py-1 pl-5 text-md hover:bg-lightgray">
                          Membership
                        </div>
                        <div className="py-1 pl-5 text-md hover:bg-lightgray">
                          Account analytics
                        </div>
                        <div className="py-1 pl-5 text-md hover:bg-lightgray">
                          Bid insights
                        </div>
                        <div className="py-1 pl-5 text-md hover:bg-lightgray">
                          Settings
                        </div>
                        <div
                          onClick={logout}
                          className="pl-5 mb-2 text-md hover:bg-lightgray text-lightgreen hover:text-"
                        >
                          Log out
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className={'py-[8px] px-[20px] mb-[30px] flex '}>
                    <div
                      className="w-[110px] h-[35px] xl:w-[140px] xl:h-[48px] bg-green rounded-[8px] flex items-center justify-center cursor-pointer"
                      onClick={() => navigate('/signin')}
                    >
                      <div className="text-[18px] text-white">
                        {t('signin')}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="fixed top-0 left-0 h-screen w-screen overflow-hidden bg-[#000000] bg-opacity-50 z-[20000] transition-all duration-200 ease-in"
                onClick={() => setNavbar(false)}
              ></div>
            </div>
          )

          // <div class="absolute w-full h-[100px] top-[69px] sm:top-[101px] xl:top-[142px] left-0 bg-white z-10 flex flex-col items-center"></div>
        }

        <div
          onClick={() => setNavbar(!navbar)}
          className="flex xl:hidden flex-col justify-center items-center w-[29.66px] sm:w-[40.61px]"
        >
          <img
            src={HamburgerIcon}
            alt="hamburger"
            className="cursor-pointer w-[29.66px] h-[20.67px] sm:w-[40.61px] sm:h-[28.4px] my-auto"
          />
        </div>
      </div>
      <div className="w-full bg-blue h-[7px]" />
    </div>
  )
}
