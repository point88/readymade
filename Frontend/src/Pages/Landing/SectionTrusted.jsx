import { OtherLogos } from '../../Services/constants/LandingPage'

export default function SectionTrusted() {
  return (
    <div className="h-[53px] sm:h-[51px] xl:h-[105px] w-full flex justify-center items-center bg-lightgray drop-shadow-custom">
      <div className="flex items-center px-[30px] sm:pl-[0] overflow-auto">
        <div className="font-[poppins] font-bold text-blue text-[10px] xl:text-[18px] pr-[22px] whitespace-nowrap">
          Trusted by:
        </div>
        <div className="flex gap-[10px] md:gap-[40px] items-center">
          {OtherLogos.map((obj, index) => (
            <img
              key={index}
              src={obj}
              alt={'trusted company' + index}
              className="w-[39px] sm:w-[51px] xl:w-[110px] h-[23px] sm:h-[31px] xl:h-[66px]"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
