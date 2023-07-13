import i18n from '../../../i18n'

export default function FeedbackCard({ content, avatar, name }) {
  const lng = i18n.language === 'en' ? true : false

  return (
    <div className="w-full sm:w-[287px] xl:w-[318px] h-full sm:h-[283px] xl:h-[315px] px-[23px] pt-[30px] pb-[18px] bg-white drop-shadow-card rounded-[8px]">
      <div
        dir="ltr"
        className={`${
          lng ? 'font-[poppins]' : 'font-[Almarai]'
        } flex flex-col justify-between h-full`}
      >
        <div
          className={
            'font-[poppins] pr-[23px] text-gray text-[16px] leading-[26px] ' +
            (lng ? 'text-left' : 'text-right')
          }
        >
          {content}
        </div>
        <div
          dir={lng ? 'ltr' : 'rtl'}
          className={`flex justify-start items-center gap-x-[14px] pl-[0px] mt-[34px] xl:mt-[53px]`}
        >
          <img
            src={avatar}
            alt={name}
            className="w-[10vw] h-[10vw] sm:w-[55px] sm:h-[55px] rounded-full"
          />
          <div className="text-darkblue text-[17px] xl:text-[18px] font-[poppins]">
            {name}
          </div>
        </div>
      </div>
    </div>
  )
}
