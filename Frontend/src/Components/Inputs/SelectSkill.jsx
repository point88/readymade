import CheckedIcon from '../../Assests/Images/checked.png'
import AddIcon from '../../Assests/Images/add.png'

const SelectSkill = ({ categories, selectedSkills, setSelectedSkills }) => {
  const addNewSkill = (item) => {
    const list = selectedSkills?.map((skill) => skill?.id)
    if (!list.includes(item?.id)) {
      setSelectedSkills([...selectedSkills, item])
    } else {
      const temp = selectedSkills?.filter((skill) => skill.id !== item.id)
      setSelectedSkills(temp)
    }
  }

  const checkIncludesSkills = (item) => {
    const list = selectedSkills?.map((skill) => skill?.id)
    return list.includes(item?.id)
  }

  return (
    <div className="w-full sm:w-[541px] h-[294px] filter drop-shadow-custom bg-white rounded-[10px]">
      <div className="text-[#07122F] font-[poppins] text-[15px] sm:text-[19px] leading-[21px] font-bold py-[15px] px-[29px] whitespace-nowrap">
        Websites, IT & Software
      </div>
      <div className="w-full border-solid border-[1px] border-[#d1d1d1]"></div>

      <div className="filter drop-shadow-custom w-full h-[240px] overflow-auto scrollbar">
        {categories.map((item, index) => {
          return (
            <div key={item?.id}>
              <div className="flex pl-[22px] pr-[19px] h-[50px] items-center cursor-pointer justify-between">
                <h1 className="font-[poppins] text-[12px] sm:text-[16px] leading-[18px] font-[500] text-[#312f2f]">
                  {item?.skill_name}
                </h1>
                <div onClick={() => addNewSkill(item)}>
                  {checkIncludesSkills(item) ? (
                    <img src={CheckedIcon} alt="selectedskills" />
                  ) : (
                    <img src={AddIcon} alt="addskill" />
                  )}
                </div>
              </div>
              {index !== categories.length - 1 && (
                <div className="w-full border-solid border-[1px] border-[#d1d1d1]"></div>
              )}
            </div>
          )
        })}
      </div>

      <style>
        {`
                ::-webkit-scrollbar {
                    width: 17px;
                }
                
                /* background color of the scrollbar */
                ::-webkit-scrollbar-track {
                    background-color: #ffffff;
                    border-bottom-right-radius: 10px;
                }
                
                /* color of the scrollbar thumb */
                ::-webkit-scrollbar-thumb {
                    background-color: #c1c0c1;
                    border-radius: 10px
                }
                
                /* color of the scrollbar thumb on hover */
                ::-webkit-scrollbar-thumb:hover {
                    background-color: #555;
                }
            `}
      </style>
    </div>
  )
}

export default SelectSkill
