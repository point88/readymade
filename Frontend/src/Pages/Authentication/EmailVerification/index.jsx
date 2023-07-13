import WelcomeIcon_Green from "../../../Assests/Images/welcome_green.png";

import EmailVerification from './emailverification'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { useDispatch } from 'react-redux';
export default () => {

    const { t } = useTranslation();
    const lng = i18n.language === 'en' ? true : false;
    const dispatch = useDispatch();
    const [loadingOpen, setLoadingOpen] = useState(false);
    return(
        <div dir={lng ? "ltr" : "rtl"} className="block lg:flex w-full h-[1143px] lg:h-[1024px] relative">
            <div className={"bg-[#FED821] w-full lg:w-[45%] xl:w-[48%] h-[508px] lg:h-full flex flex-col lg:flex-row justify-start lg:justify-center items-center m-auto sm:pt-[82px] lg:pt-0 pt-[82px]"}>
                <div className='flex flex-col sm:flex-row-reverse lg:flex-col items-center justify-between w-[90%] mb:w-[360px] sm:w-[446px]'>
                    <img className="w-[80px] h-[80px] sm:w-[128px] lg:w-[191.76px] sm:h-[128px] lg:h-[191.76px]" src={WelcomeIcon_Green} alt="smile" />
                    {
                        <h1 className={`${lng ? "text-center sm:text-left lg:text-center" : "text-center sm:text-right lg:text-center"} mt-0 lg:mt-[30px] lg:mr-[0px] text-[40px] md:text-[51px] font-bold font-[almarai] leading-[60px] text-[#FEFEFE] w-auto sm:max-w-[330px]`}>
                            {
                                t('signintitle2')
                            }
                        </h1>
                       
                    }
                </div>
            </div>
            <div className='bg-transparent w-full lg:min-w-[612px] lg:w-[55%] h-full absolute lg:relative top-0 flex lg:block justify-center'>
                <div className="bg-transparent lg:bg-opacity-[0.7] lg:h-full flex flex-col items-center justify-start">

                    <EmailVerification setLoadingOpen={setLoadingOpen}/>
                   
                    <div dir="ltr" className={`font-[poppins] text-[12px] text-[#8d93a1] leading-[18px] font-[400] absolute ${lng ? 'right-[40px]' : 'left-[40px]'} bottom-[15px] mt-auto hidden lg:block`}>
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