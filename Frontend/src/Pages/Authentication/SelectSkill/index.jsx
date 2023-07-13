import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import LogoEn from '../../../Assests/Images/logo_en.png'
import LeftBitIcon_Green from '../../../Assests/Images/leftbit_green.png'
import {
  SearchSkill,
  SelectCategory,
  SelectSkill,
} from '../../../Components/Inputs'
import AuthService from '../../../Services/auth'
import i18n from '../../../i18n'

const SelectSkillPage = () => {
  const { state } = useLocation()

  const { t } = useTranslation()
  const navigate = useNavigate()
  const lng = i18n.language === 'en' ? true : false
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({})
  const [skillsByCategory, setSkillsByCategory] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])

  useEffect(() => {
    async function fetchCategory() {
      const data = await AuthService.fetchCategories()
      setCategories(data)
    }
    fetchCategory()
  }, [])

  useEffect(() => {
    async function fetchSkills() {
      const data = await AuthService.fetchSkills(selectedCategory.id)
      setSkillsByCategory(data)
    }
    if (!!Object.keys(selectedCategory).length) fetchSkills()
  }, [selectedCategory])

  const handleNext = async () => {
    await AuthService.uploadSelectedSkills(selectedSkills)
    navigate(
      !!state?.isSocialLogin ? '/new/payment-verify' : '/new/email-verify',
    )
  }

  return (
    <div
      className={`w-full lg:w-[52%] h-full flex justify-start lg:justify-center items-center flex-col mt-[78px] lg:mt-[-13px] relative ${
        lng ? 'font-[poppins]' : 'font-[almarai]'
      }`}
    >
      <div className="w-full sm:w-[612px] flex flex-col items-center bg-white filter drop-shadow-custom1 px-[10px] sm:px-[32px] pt-[26px] pb-[26px]">
        <div className="flex w-full mb:w-[340px] sm:w-[544px] justify-between items-start flex-col-reverse sm:flex-row">
          <div>
            <div className="text-[#07122F] text-[13px] md:text-[17px] leading-[23.5px] font-bold">
              {t('tellyourtopskills')}
            </div>
            <div className="text-[#07122F] text-[13px] md:text-[17px] leading-[23.5px] font-[400]">
              {t('helpusrecommend')}
            </div>
          </div>
          <img
            src={LogoEn}
            alt="Logo"
            className="w-[135px] h-[48px] sm:m-0 m-auto"
          />
        </div>
        <SearchSkill />
        <SelectCategory
          categories={categories}
          setCategory={setSelectedCategory}
          category={selectedCategory}
        />
        <div className="flex justify-center items-center w-full mt-[21px] mb-[18px]">
          <div className="w-[48%] h-[1px] bg-[#D1D1D1]"></div>
          <div className="px-[10px] text-[16px] font-[500]">{t('or')}</div>
          <div className="w-[48%] h-[1px] bg-[#D1D1D1]"></div>
        </div>
        <SelectSkill
          categories={skillsByCategory}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
        />
        <div className="px-[5%] sm:px-[32px] mt-[10px] sm:mt-[33px]  w-full flex flex-col justify-between flex-col-reverse sm:flex-row gap-y-[10px]">
          <div className="gap-y-[5px] sm:gap-y-[25px] flex flex-col">
            <div className="text-[#07122F] text-[13px] sm:text-[17px] leading-[16px] font-bold">
              {lng
                ? `${selectedSkills.length} out of 240 skills selected`
                : `تم اختيار ${selectedSkills.length} مهارات من أصل 240`}{' '}
            </div>
            <div className="text-[#312F2F] text-[10px] sm:text-[14px] leading-[16px]">
              3984 {t('jobmatching')}
            </div>
          </div>
        </div>
        <div
          dir="ltr"
          className="flex items-start gap-x-1 justify-end flex-wrap m-1 w-full"
        >
          {selectedSkills.map((item) => (
            <div
              className="whitespace-nowrap text-[#717171] my-1 mx-2 py-[9px] px-[17px] text-[20px] leading-[15px] font-[500] border-solid border-[1px] border-[#989898] bg-white rounded-[25px]"
              key={item.id}
            >
              {item.skill_name}
            </div>
          ))}
        </div>
        <div dir="ltr" className="w-full flex justify-between mt-[20px]">
          <div
            className="flex text-[17px] leading-[15px] text-[#312f2f] font-[500] items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img
              src={LeftBitIcon_Green}
              alt="previous"
              className="w-[10px] h-[18px] cursor-pointer mr-[9px]"
            />
            {t('signin12')}
          </div>
          <Button
            className={`${
              lng ? 'font-[poppins]' : 'font-[almarai]'
            } normal-case w-[110px] h-[37px] bg-[#009800] flex justify-center items-center cursor-pointer text-[18px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
            onClick={handleNext}
          >
            {t('nextbutton')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SelectSkillPage
