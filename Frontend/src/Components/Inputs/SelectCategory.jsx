import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'

const SelectCategory = ({ categories, setCategory, category }) => {
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  return (
    <div
      className={`w-full sm:w-[541px] h-[294px] filter drop-shadow-custom bg-white rounded-[10px] mt-[22px] ${
        lng ? 'font-[poppins]' : 'font-[almarai]'
      }`}
    >
      <div className="text-[#07122F] text-[15px] sm:text-[19px] leading-[21px] font-bold py-[15px] px-[29px]">
        {t('selectcategory')}
      </div>
      <div className="w-full border-solid border-[1px] border-[#d1d1d1]"></div>
      <div className="filter drop-shadow-custom w-full h-[241px] overflow-auto scrollbar">
        {categories?.map((item, index) => (
          <div
            key={'skills' + index}
            className={`${category.id === item.id && 'bg-lightgray1'}`}
            onClick={() => setCategory(item)}
          >
            <div
              className={`flex ${
                lng ? 'ml-[22px]' : 'mr-[22px]'
              } h-[50px] items-center cursor-pointer`}
            >
              <img
                src={`/images/category_${(index + 1) % 8}.png`}
                alt={item}
                className="w-[28px] h-[30px]"
              />
              <h1
                className={`${
                  lng ? 'ml-[15px]' : 'mr-[15px]'
                } text-[12px] sm:text-[16px] leading-[18px] font-[500] text-[#312f2f]`}
              >
                {item.category_name}
              </h1>
            </div>
            {index !== categories?.length - 1 && (
              <div className="w-full border-solid border-[1px] border-[#d1d1d1]"></div>
            )}
          </div>
        ))}
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

export default SelectCategory
