import PlusIcon from '../../../Assests/Images/plus.svg'
import Left from '../../../Assests/Images/left_arrow.png'
import Right from '../../../Assests/Images/right_arrow.png'
import { useTranslation  } from 'react-i18next';
import i18n from "../../../i18n";

export default function Avatars({ number, avatars }) {
    const { t } = useTranslation();
    const lng = i18n.language === 'en' ? true : false;

    return (
        <div className='flex flex-col-reverse md:flex-col items-center md:items-end xl:items-start'>
            <div>
                <div className={`${lng ? 'font-[Poppins]' : 'font-[Almarai]'} text-[12px] md:text-[17px] ml-[20px] md:ml-[40px] mb-[7px] md:mb-[12px]`}>{t('peopleloves')}</div>
                <div className='flex items-center ml-[25px] md:ml-[40px] xl:ml-[35px]'>
                    {avatars.map((avatar, index) => (
                        <img key={index} src={avatar} alt='' className='w-[30px] h-[30px] mb:w-[45px] mb:h-[45px] md:w-[85px] md:h-[85px] xl:w-[62px] xl:h-[62px] border-[2px] mb:border-[3px] md:border-[5px] border-white rounded-full -ml-[20px] mb:-ml-[25px] md:-ml-[40px] xl:-ml-[35px]' />
                    ))}
                    <div className='flex justify-center items-center w-[30px] h-[30px] mb:w-[45px] mb:h-[45px] md:w-[85px] md:h-[85px] xl:w-[62px] xl:h-[62px] bg-lightgreen2 rounded-full -ml-[20px] mb:-ml-[25px] md:-ml-[40px] xl:-ml-[35px]'>
                        <img src={PlusIcon} alt='' className='w-[15px] h-[15px] md:w-[20px] md:h-[20px] xl:w-[32px] xl:h-[32px]' />
                    </div>
                </div>
            </div>
            <div dir="ltr" className={`flex justify-center ${lng ? 'xl:justify-start' : 'xl:justify-end'} mt-[8px] md:mt-[15px] mb-[15px] md:mb-[33px] xl:mb-[0px] w-full md:w-[400px] xl:w-full pr-[0px] md:pr-[0px] pl-[0px] md:pl-[0px] ${lng ? 'xl:pl-[60px]' : 'xl:pr-[60px]'}`}>
                <div className='rounded-full bg-white mx-5 w-[32px] h-[32px] md:w-[61px] md:h-[61px] xl:w-[45px] xl:h-[45px] flex justify-center items-center'>
                    <img className='w-auto h-[13px] md:h-[24px] xl:h-[17px]' src={Left} alt="" />
                </div>
                <div className='rounded-full bg-white mx-5 w-[32px] h-[32px] md:w-[61px] md:h-[61px] xl:w-[45px] xl:h-[45px] flex justify-center items-center'>
                    <img className='w-auto h-[13px] md:h-[24px] xl:h-[17px]' src={Right} alt="" /> 
                </div>
            </div>
        </div>
    )
}