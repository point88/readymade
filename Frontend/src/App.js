import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
// import Loading from './Components/Loading'
import Routes from './Routes'
import i18n from './i18n'
import { ToastContainer } from 'react-toast'
import LocaleContext from './LocaleContext'
function App() {
  useEffect(() => {
    if (localStorage.getItem('lng') === undefined) {
      localStorage.setItem('lng', 'en')
    }
    i18n.changeLanguage(localStorage.getItem('lng') ?? i18n.language)
  }, [])
  const [locale, setLocale] = useState(
    localStorage.getItem('lng') ?? i18n.language,
  )
  i18n.on('languageChanged', (lng) => setLocale(i18n.language))
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {/* <Suspense fallback={<Loading />}> */}
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ToastContainer delay={3000} position="bottom-center" />
      {/* </Suspense> */}
    </LocaleContext.Provider>
  )
}

export default App
