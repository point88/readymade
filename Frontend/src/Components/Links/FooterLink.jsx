import { useNavigate } from 'react-router-dom';

export default function FooterLink({ title, route }) {
    const navigate = useNavigate();

    return (
        <div className='flex gap-[25px] items-center'>
            <div className='w-[10px] h-[10px] mb:w-[15px] mb:h-[15px] border-[2px] border-gray' />
            <div className='cursor-pointer text-gray text-[10px] mb:text-[16px] sm:text-[21px]' onClick={() => navigate(route)}>{title}</div>
        </div>
    )
}