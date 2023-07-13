import { InputBase, Box } from '@mui/material'
import SearchIcon from '../../Assests/Images/magnifier.png'
import { useState } from 'react'
import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'

const SearchSkill = () => {
  const [keyword, setKeyword] = useState('')
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false

  return (
    <div className="bg-[#7c957f] w-full sm:w-[544px] h-[49px] bg-opacity-5 flex items-center px-[21px] py-[15px] mt-[7px]">
      <Box component={'img'} src={SearchIcon} className="w-[23px] h-[23px]" />
      <InputBase
        sx={{
          fontFamily: lng ? 'Poppins' : 'Almarai',
          fontSize: '16px',
          colour: '#b1bbc6',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
        placeholder={t('searchskill')}
        value={keyword}
        fullWidth={true}
        onChange={(e) => {
          setKeyword(e.target.value)
        }}
      />
    </div>
  )
}

export default SearchSkill
