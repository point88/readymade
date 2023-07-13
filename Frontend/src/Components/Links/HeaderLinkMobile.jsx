import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import LocaleContext from '../../LocaleContext'
import i18n from '../../i18n'

export default function HeaderLinkMobile({ title, route }) {
  const navigate = useNavigate()
  const { locale } = useContext(LocaleContext)
  const changeLocale = (l) => {
    if (locale !== l) {
      i18n.changeLanguage(l)
    }
  }
  return (
    <>
      {route === 'language' ? (
        <div
          className={
            'hover:bg-[#333333] hover:text-white py-[8px] px-[20px] text-[18px] text-blue cursor-pointer ' +
            (i18n.language === 'en' ? 'text-left' : 'text-right')
          }
          onClick={() => {
            changeLocale(i18n.language !== 'en' ? 'en' : 'ar')
          }}
        >
          {title}
        </div>
      ) : (
        <div
          className={
            'hover:bg-[#333333] hover:text-white py-[8px] px-[20px] text-[18px] text-blue cursor-pointer ' +
            (i18n.language === 'en' ? 'text-left' : 'text-right')
          }
          onClick={() => navigate(route)}
        >
          {title}
        </div>
      )}
    </>
  )
}
