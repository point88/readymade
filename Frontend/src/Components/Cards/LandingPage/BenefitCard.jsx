

export default function BenefitCard({ icon, title, subTitle }) {
    return (
        <div className='flex gap-x-[12px] items-center'>
            <div>
                <img src={icon} alt={title} className='xl:w-[93px] xl:h-[71px] sm:w-[54px] sm:h-[53.4px] w-[34px] h-[32px]' />
            </div>
            <div className='text-darkblack max-w-[481px]'>
                <div className='leading-[18px] sm:leading-[30px] xl:leading-[39px] text-[12px] sm:text-[20px] xl:text-[26px] font-bold'>{title}</div>
                <div className='leading-[13.5px] sm:leading-[24px] xl:leading-[39px] text-[9px] sm:text-[16px] xl:text-[20px]'>{subTitle}</div>
            </div>
        </div>
    )
}
