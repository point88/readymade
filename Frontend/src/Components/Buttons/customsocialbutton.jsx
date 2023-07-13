export const CustomButton = ({ lng, rightIcon, onClick }) => (

      <div className="h-full bg-[#e4ebf3] w-[56px] flex items-center justify-center cursor-pointer" onClick={onClick}>
        <img src={rightIcon} alt="rightbit" className={`transform ${lng ? 'scale-x-[1]' : 'scale-x-[-1]'}`} />
      </div>
)