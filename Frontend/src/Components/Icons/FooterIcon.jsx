export default function FooterIcon({ src, route }) {
    return (
        <a href={route} >
            <img src={src} alt='' className='w-[25px] h-[25px]' />
        </a>
    )
}
