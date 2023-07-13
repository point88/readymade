import { useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import LinkAccountForm from './linkaccount'
import i18n from '../../../i18n'

const LinkedAccount = () => {
  const lng = i18n.language === 'en' ? true : false

  const [loadingOpen, setLoadingOpen] = useState(false)
  return (
    <div
      dir={lng ? 'ltr' : 'rtl'}
      className="block lg:flex w-full h-[1143px] lg:h-[1024px] relative"
    >
      <div className="bg-transparent w-full lg:min-w-[612px] lg:w-[55%] h-full absolute lg:relative top-0 flex lg:block justify-center">
        <div className="bg-transparent lg:bg-opacity-[0.7] lg:h-full flex flex-col items-center justify-start">
          <LinkAccountForm />

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

export default LinkedAccount
