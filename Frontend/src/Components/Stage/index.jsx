const Stage = ({ step }) => {
  const array = Array(4)
    .fill(0)
    .map((_, key) => key)
  return (
    <div className="flex items-center justify-center w-full h-16 lg:h-60">
      <div className="lg:w-2/3 w-full px-10 lg:px-0 flex justify-between">
        {array.map((value) => (
          <div
            key={value}
            className={`w-1/5 h-3 bg-darkgreen ${
              value === step ? 'opacity-100' : 'opacity-25'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Stage
