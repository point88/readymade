import { useNavigate } from 'react-router-dom';

export default function SignButton({ title, route }) {
    const navigate = useNavigate();

    return (
        <div className='w-[110px] h-[35px] xl:w-[140px] xl:h-[48px] bg-green rounded-[8px] flex items-center justify-center cursor-pointer' onClick={() => navigate(route)}>
            <div className='text-[14px] xl:text-[18px] text-white'>{title}</div>
        </div >
    )
}