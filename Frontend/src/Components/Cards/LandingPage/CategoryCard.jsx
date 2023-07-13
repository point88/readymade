import i18n from '../../../i18n'

export default function CategoryCard({ icon, title, content, status }) {
  const lng = i18n.language === 'en' ? true : false

  return (
    <div
      className={`2xl:h-[320px] mb:min-w-[300px] mb:min-h-[255px] xl:min-w-[295px] xl:min-h-[253px] border-[1px] m-auto border-lightgreen1 rounded-[8px] bg-white relative filter drop-shadow-card p-[22px] flex flex-col justify-between items-center ${
        lng ? 'font-[poppins]' : 'font-[Almarai]'
      }`}
    >
      <div className="w-full flex justify-center">
        <img
          src={icon}
          alt=""
          className="w-[57px] h-[57px] 2xl:w-[77px] 2xl:h-[77px]"
        />
      </div>
      <div className="text-center px-[30px]">
        <div className="text-darkblue text-[16px] 2xl:text-[22px]">{title}</div>
        <div className="pt-[14px] text-gray text-[14px]">{content}</div>
      </div>
      <div className="w-full text-center text-lightgreen1 text-[11px] 2xl:text-[14px]">
        {status}
      </div>
    </div>
  )
}
