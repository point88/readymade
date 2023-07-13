import i18n from '../../../i18n'
export default function ServiceCard({ id, image, subTitle, title }) {
  const lng = i18n.language === 'en' ? true : false
  return (
    <div className="w-full relative">
      <div className="m-auto relative">
        <img
          src={image}
          alt={title}
          className={
            'w-full h-full rounded-[15px] border-[5px]' +
            `${id % 2 === 0 ? ' border-darkgreen1' : ' border-lightyellow1'}`
          }
        />
        <div
          dir={lng ? 'ltr' : 'rtl'}
          className={
            'w-full text-white absolute top-[21px] drop-shadow-custom ' +
            (lng
              ? 'font-[poppins] xtext-left left-[19px] '
              : 'font-[Almarai] text-right right-[19px] ')
          }
        >
          <div className="w-[85%] text-[8px] mb:text-[16px] xl:text-[14px]">
            {subTitle}
          </div>
          <div className="w-[85%] text-[14px] mb:text-[28px] xl:text-[20px] font-bold">
            {title}
          </div>
        </div>
      </div>
    </div>
  )
}
