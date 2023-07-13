const CustomInput = ({ title, placeholder, type, className, handleChange }) => {
  return (
    <div className={className}>
      <div className="text-[15px] lg:text-2xl font-bold leading-[30px] lg:leading-[75px] mb-1 lg:mb-3">
        {title}
      </div>
      {type === 'text' && (
        <input
          className="w-full bg-white h-14 border rounded-md border-darkgreen/[0.25] px-5 focus-visible:border-darkgreen outline-none"
          type="text"
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
      {type === 'textarea' && (
        <textarea
          className="w-full h-32 py-3 bg-white border rounded-md border-darkgreen/[0.25] px-5 focus-visible:border-darkgreen outline-none"
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
    </div>
  )
}

export default CustomInput
