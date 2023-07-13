import RatingStar from '../../RatingStar'
import BgdImage from '../../../Assests/Images/man.png'
import { useTranslation  } from 'react-i18next';
import i18n from "../../../i18n";

export default function HelpCard() {
    const { t } = useTranslation();
    const lng = i18n.language === 'en' ? true : false;

    return (
        <div className='w-full max-w-[320px] sm:max-w-[550px] xl:max-w-[552px] relative text-center'>
            <img src={BgdImage} alt='' className={`w-full h-full rounded-tr-[50px] rounded-bl-[50px] sm:rounded-tr-[85px] sm:rounded-bl-[85px] ${lng ? '' : 'transform scale-x-[-1]'} border-[5px] border-lightyellow`} />
            <div className={`hidden xl:flex absolute w-[155px] sm:w-[267px] xl:w-[220px] h-[101px] sm:h-[174px] xl:h-[144px] bg-white border-none rounded-[8px] drop-shadow-card flex-col items-center justify-around ${lng ? 'font-[poppins] -top-[59px] -right-[130px]' : 'font-[Almarai] -top-[59px] -left-[130px]'}`}>
                {
                    lng && 
                    <div className='text-[13px] sm:text-[24px] xl:text-[19px] text-darkblue'>{t('foundjobs')}</div>
                }
                {
                    !lng &&
                    <div className='text-[13px] sm:text-[24px] xl:text-[19px] text-darkblue'>تم العثور على</div>
                }
                {
                    !lng &&
                    <div className='text-[13px] sm:text-[24px] xl:text-[19px] text-darkblue'>من 250 وظيفة +</div>
                }
                <RatingStar value={5} />
                <div className='text-[10px] sm:text-[21px] xl:text-[17px] text-darkgreen'>{t('glants')}</div>
            </div>
            <div className={`flex xl:hidden absolute left-[80px] sm:left-[150px] -bottom-[64px] sm:-bottom-[111px] w-[50%] mb:w-[155px] sm:w-[267px] xl:w-[220px] h-[101px] sm:h-[174px] xl:h-[144px] p-2 bg-white border-none rounded-[8px] drop-shadow-card flex-col items-center justify-around ${lng ? 'font-[poppins]' : 'font-[Almarai]'}`}>
                {
                    lng && 
                    <div className='text-[3vw] mb:text-[13px] sm:text-[24px] xl:text-[19px] text-darkblue max-w-[172px]'>{t('foundjobs')}</div>
                }
                {
                    !lng &&
                    <div className='text-[3vw] mb:text-[13px] sm:text-[24px] xl:text-[19px] text-darkblue max-w-[172px]'>تم العثور على</div>
                }
                {
                    !lng &&
                    <div className='text-[3vw] mb:text-[13px] sm:text-[24px] xl:text-[19px] text-darkblue max-w-[172px]'>من 250 وظيفة +</div>
                }
                <RatingStar value={5} />
                <div className='text-[10px] sm:text-[21px] xl:text-[17px] text-darkgreen'>{t('glants')}</div>
            </div>
        </div>
    )
}
