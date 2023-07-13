import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import LocaleContext from '../../LocaleContext'
import i18n from '../../i18n'

export default function HeaderLink({ title, route }) {
  const navigate = useNavigate()
  const { locale } = useContext(LocaleContext)
  const changeLocale = (l) => {
    if (locale !== l) {
      i18n.changeLanguage(l)
      localStorage.setItem('lng', l)
    }
  }
  return (
    <div className="flex gap-[5px] items-center">
      {route === 'language' ? (
        <div
          className="text-[14px] xl:text-[18px] text-blue cursor-pointer"
          onClick={() => {
            changeLocale(title !== 'English' ? 'en' : 'ar')
          }}
        >
          {title}
        </div>
      ) : (
        <div
          className="text-[14px] xl:text-[18px] text-blue cursor-pointer"
          onClick={() => navigate(route)}
        >
          {title}
        </div>
      )}
      <div className="bg-green rounded-full w-[6px] h-[6px]" />
    </div>
  )
}
