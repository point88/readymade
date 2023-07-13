import i18n from '../../../i18n'

const ProjectTypeCard = ({
  onChange,
  projectTypes,
  value,
  title,
  bio,
  range,
  currencyType,
  isPrimary,
}) => {
  const lng = i18n.language === 'en' ? true : false
  const isChecked = projectTypes?.[value] || false

  return (
    <div className="flex items-start lg:items-center justify-between flex-col sm:flex-row my-3 border-b border-b-lightgreen pb-3">
      <div>
        <div className="flex items:center sm:items-start lg:items-center">
          <input
            type="checkbox"
            onChange={(e) => {
              const newValue = { ...projectTypes, [value]: e.target.checked }
              onChange(newValue)
            }}
            checked={isChecked}
            className={`${
              lng ? 'mr-4' : 'ml-4'
            } rounded-md lg:h-6 lg:w-6 mt-1 lg:mt-0`}
          />
          <div className="flex flex-col items-center justify-center">
            <div
              className={`${
                isPrimary ? 'bg-darkgreen' : 'bg-yellow'
              } text-white text-sm font-bold lg:font-normal lg:text-[21px] text-center leading-[25px] w-28 lg:w-[250px] py-1 rounded-xl`}
            >
              {title}
            </div>
            <div className="hidden sm:block lg:hidden text-base text-lightgreen">
              $ {range} {currencyType}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block text-sm lg:text-base w-2/3 lg:w-1/3 mx-5">
        {bio}
      </div>
      <div className="hidden lg:block text-base mb-5">
        $ {range} {currencyType}
      </div>
      <div className="flex sm:hidden gap-5 mt-3">
        <div className="text-xs w-3/4 ">{bio}</div>
        <div className="text-sm mt-auto text-lightgreen">
          $ {range} {currencyType}
        </div>
      </div>
    </div>
  )
}

export default ProjectTypeCard
