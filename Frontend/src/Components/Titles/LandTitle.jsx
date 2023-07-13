import i18n from '../../i18n';
export default function LandTitle({ text }) {
    const lng = i18n.language === 'en' ? true : false;
    return (
        <div dir={lng ? "ltr" : "rtl"} className={'text-center font-bold text-green leading-[30px] sm:leading-[33px] xl:leading-[58.5px] text-[20px] sm:text-[22px] xl:text-[39px] underline underline-offset-[10px] decoration-lightyellow ' + (lng ? "font-[poppins] xl:text-left " : "font-[Almarai] xl:text-right ")}>
            {text}
        </div>
    )
}