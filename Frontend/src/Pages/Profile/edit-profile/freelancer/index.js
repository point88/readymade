import React from 'react'
import { Avatar, Button, Icon } from '@mui/material'
import { useState, useMemo, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Country, State, City } from 'country-state-city'
import { Languages, proficiencyList } from '../../../../constant'

import {
  SearchSkill,
  SelectCategory,
  SelectSkill,
} from '../../../../Components/Inputs'
import { ReactComponent as Plus } from '../../../../Assests/Images/plus-black.svg'
import { ReactComponent as Close } from '../../../../Assests/Images/close-black.svg'

import EditProfileBackImage from '../../../../Assests/Images/profile-edit-background.png'

import AuthService from '../../../../Services/auth'
import ProfileService from '../../../../Services/profile'

import validator from 'validator'

import i18n from '../../../../i18n'
import { yieldExpression } from '@babel/types'
import { changeLanguage, exists } from 'i18next'
import { toast } from 'react-toast'

const FreelancerEditProfile = ({ user }) => {
  ///================== Profile  =================////
  const refBack = useRef(null)
  const refAvart = useRef(null)
  const [backfile, setBackfile] = useState(null)
  const [avartfile, setAvartfile] = useState(null)
  const [previewBack, setPreviewBack] = useState()
  const [previewAvart, setPreviewAvart] = useState()

  const [proheadLine, setProHeadLine] = useState('')
  const [proHourly, setProHourly] = useState(0)
  const [proSummary, setProSummary] = useState('')
  ///================== Translate =================/////////

  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false

  ///================== Skills using Component =================////
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({})
  const [skillsByCategory, setSkillsByCategory] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])

  ///==============> Contact <===================///

  const [country, setCountry] = useState({})
  const [city, setCity] = useState({})
  const [state, setState] = useState({})
  const [street, setStreet] = useState('')
  const [zipPost, setZipPost] = useState('')
  const [phone, setPhone] = useState('')

  //========================> Data store array < ========================
  const [langList, setLangList] = useState([{ lang: null, prof: null }])

  const [expList, setExpList] = useState([
    {
      title: null,
      company: null,
      startmonth: null,
      startyear: null,
      endmonth: null,
      endyear: null,
      summary: null,
    },
  ])

  const [eduList, setEduList] = useState([
    {
      country: null,
      university: null,
      degree: null,
      startyear: null,
      endyear: null,
    },
  ])

  const [quaList, setQuaList] = useState([
    { profaward: null, conorgan: null, summary: null, startyear: null },
  ])

  const [pubList, setPubList] = useState([
    { title: null, publisher: null, summay: null },
  ])
  //==================================================================
  const years = (startyear) => {
    startyear = startyear || 1950
    var currentYear = new Date().getFullYear(),
      years = []
    while (startyear <= currentYear) {
      years.push(startyear++)
    }
    return years.reverse()
  }
  const yearsList = useMemo(
    (sy) =>
      years(sy).map((y) => {
        return {
          label: y,
          value: y,
        }
      }),
    [],
  )

  const months = () => {
    var mon = 1,
      month = []
    while (mon <= 12) {
      month.push(mon++)
    }
    return month
  }

  const getMonthName = (monthNumber) => {
    const date = new Date()
    date.setMonth(monthNumber - 1)

    return date.toLocaleString([], { month: 'long' })
  }

  const monthsList = months().map((m) => {
    return {
      label: getMonthName(m),
      value: m,
    }
  })

  //==================== useEffect <=================================
  // background image and avatar
  useEffect(() => {
    if (backfile) {
      const reader = new FileReader()
      reader.readAsDataURL(backfile[0])
      reader.onloadend = () => {
        setPreviewBack(reader.result)
      }
    }
  }, [backfile])

  useEffect(() => {
    if (avartfile) {
      const reader = new FileReader()
      reader.readAsDataURL(avartfile[0])
      reader.onloadend = () => {
        setPreviewAvart(reader.result)
      }
    }
  }, [avartfile])

  useEffect(() => {
    setState({})
  }, [country])

  useEffect(() => {
    setCity({})
  }, [country, state])

  //---------- set skills and categories
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

  //===========================> useMemo <==============================
  const countryList = useMemo(
    () =>
      Country.getAllCountries().map((e) => ({
        label: e.name,
        value: e.isoCode,
      })),
    [],
  )
  const stateList = useMemo(
    () =>
      State.getStatesOfCountry(country?.value).map((e) => ({
        label: e.name,
        value: e.isoCode,
      })),
    [country],
  )
  const cityList = useMemo(
    () =>
      City.getCitiesOfState(country?.value, state?.value).map((e) => ({
        label: e.name,
        value: e.name,
      })),
    [country, state],
  )

  // background image and avatar file upload
  const backUpload = () => {
    refBack.current?.click()
  }
  const avartUpload = () => {
    refAvart.current?.click()
  }

  const handleChangeBack = (e) => {
    let files = Array.from(e.currentTarget.files ?? [])
    setBackfile([...files])
  }

  const handleChangeAvart = (e) => {
    let files = Array.from(e.currentTarget.files ?? [])
    setAvartfile([...files])
  }
  ///============================ Language =========================///
  const addLanguage = () => {
    let temp = langList
    temp.push({ lang: null, prof: null })
    setLangList([...temp])
  }

  const selectLanguage = (val, index) => {
    let temp = langList
    temp[index].lang = val
    setLangList([...temp])
  }

  const selectProficiency = (val, index) => {
    let temp = langList
    temp[index].prof = val
    setLangList([...temp])
  }

  const closeLangeset = (key) => {
    let temp = langList
    temp.splice(key, 1)
    setLangList([...temp])
  }
  ///============================> Experience <=========================///
  const addExperience = () => {
    let temp = expList
    temp.push({
      title: null,
      company: null,
      startmonth: null,
      startyear: null,
      endmonth: null,
      endyear: null,
      summary: null,
    })
    setLangList([...temp])
    console.log(expList)
  }

  const chExpTitle = (val, index) => {
    let temp = expList
    temp[index].title = val
    setExpList([...temp])
  }
  const chExpCompany = (val, index) => {
    let temp = expList
    temp[index].company = val
    setExpList([...temp])
  }
  const chExpStMonth = (val, index) => {
    let temp = expList
    temp[index].startmonth = val
    setExpList([...temp])
  }
  const chExpStYear = (val, index) => {
    let temp = expList
    temp[index].startyear = val
    setExpList([...temp])
  }
  const chExpEnMonth = (val, index) => {
    let temp = expList
    temp[index].endmonth = val
    setExpList([...temp])
  }
  const chExpEnYear = (val, index) => {
    let temp = expList
    temp[index].endyear = val
    setExpList([...temp])
  }
  const chExpSummary = (val, index) => {
    let temp = expList
    temp[index].summary = val
    setExpList([...temp])
  }

  const closeExperience = (key) => {
    let temp = expList
    temp.splice(key, 1)
    setExpList([...temp])
  }
  ///============================> Education <=========================///
  const addEducation = () => {
    let temp = eduList
    temp.push({
      country: null,
      university: null,
      degree: null,
      startyear: null,
      endyear: null,
    })
    setEduList([...temp])
  }

  const chEduCountry = (val, index) => {
    let temp = eduList
    temp[index].country = val
    setEduList([...temp])
  }
  const chEduUniversity = (val, index) => {
    let temp = eduList
    temp[index].university = val
    setEduList([...temp])
  }
  const chEduStYear = (val, index) => {
    let temp = eduList
    temp[index].startyear = val
    setEduList([...temp])
  }
  const chEduEnYear = (val, index) => {
    let temp = eduList
    temp[index].endyear = val
    setEduList([...temp])
  }
  const chEduDegree = (val, index) => {
    let temp = eduList
    temp[index].degree = val
    setEduList([...temp])
  }

  const closeEducation = (key) => {
    let temp = eduList
    temp.splice(key, 1)
    setEduList([...temp])
  }
  //=========================> Qualification <======================
  const addQualification = () => {
    let temp = quaList
    temp.push({
      profaward: null,
      conorgan: null,
      summary: null,
      startyear: null,
    })
    setEduList([...temp])
  }

  const chQuProfAward = (val, index) => {
    let temp = quaList
    temp[index].profaward = val
    setQuaList([...temp])
  }
  const chQuConfOragan = (val, index) => {
    let temp = quaList
    temp[index].conorgan = val
    setQuaList([...temp])
  }
  const chQuStYear = (val, index) => {
    let temp = quaList
    temp[index].startyear = val
    setQuaList([...temp])
  }
  const chQuSummary = (val, index) => {
    let temp = quaList
    temp[index].summary = val
    setQuaList([...temp])
  }

  const closeQualification = (key) => {
    let temp = quaList
    temp.splice(key, 1)
    setEduList([...temp])
  }

  //====================== Publication <=============================
  const addPublication = () => {
    let temp = pubList
    temp.push({ title: null, publisher: null, summay: null })
    setPubList([...temp])
  }

  const chPuTitle = (val, index) => {
    let temp = pubList
    temp[index].title = val
    setPubList([...temp])
  }
  const chPuPublisher = (val, index) => {
    let temp = pubList
    temp[index].publisher = val
    setPubList([...temp])
  }
  const chPuSummay = (val, index) => {
    let temp = pubList
    temp[index].summay = val
    setPubList([...temp])
  }

  const closePublication = (key) => {
    let temp = pubList
    temp.splice(key, 1)
    setPubList([...temp])
  }
  //=============================> Save Action profileService Use <=========================

  const saveProfile = async () => {
    if (!proheadLine) {
      toast.error('Prosessional Headline is required', { position: 'top-left' })
      return
    }
    if (!validator.isLength(proheadLine, { min: 1, max: 50 })) {
      toast.error('Prosessional Headline must be less than 100 characters', {
        position: 'top-left',
      })
      return
    }
    if (!proSummary) {
      toast.error('Prosessional Summary is required', { position: 'top-left' })
      return
    }
    if (!validator.isLength(proSummary, { min: 1, max: 1000 })) {
      toast.error('Prosessional Summary must be less than 1000 characters', {
        position: 'top-left',
      })
      return
    }
    if (!proHourly) {
      toast.error('Prosessional hourly Rate is required', {
        position: 'top-left',
      })
      return
    }
    let payload = {
      background: backfile[0] || '',
      avatar: avartfile[0] || '',
      headline: proheadLine,
      summary: proSummary,
      hourly: proHourly,
    }

    const { data } = await ProfileService.saveProfile(payload)
    if (data) {
      toast.success('Saved successfully', { position: 'top-left' })
    }
  }

  const saveContact = async () => {
    if (isEmpty(country)) {
      toast.error('Country field is required', { position: 'top-left' })
      return
    }
    if (!street) {
      toast.error('Street field is required', { position: 'top-left' })
      return
    }

    if (isEmpty(phone)) {
      toast.error('Phone field is required', { position: 'top-left' })
      return
    }

    let payload = {
      country: country,
      state: state || '',
      street: street,
      city: city || '',
      zipPost: zipPost || '',
      phone: phone,
    }

    const { data } = await ProfileService.saveContact(payload)
    if (data) {
      toast.success('Saved successfully', { position: 'top-left' })
    }
  }

  const saveSkills = () => {
    if (!selectedSkills || selectedSkills.length === 0) {
      toast.error('No skills selected', { position: 'top-left' })
      return
    }

    let { data } = ProfileService.saveSkills(selectedSkills)
    if (data) {
      toast.success('Saved successfully', { position: 'top-left' })
    }
  }

  const saveExperience = async () => {
    const { errors, isValid } = validateInputForm(expList)

    if (!isValid) {
      errors.map((err) => {
        toast.error(
          `${Object.keys(expList[err.id])[err.key]} field of ${
            err.id + 1
          } experience is in correct`,
          { position: 'top-left' },
        )
      })
      return
    }

    const { data } = await ProfileService.saveExperience(expList)
    if (data) {
      toast.success('Saved successfully', { position: 'top-left' })
    }
  }

  const saveEducation = async () => {
    const { errors, isValid } = validateInputForm(eduList)

    if (!isValid) {
      errors.map((err) => {
        toast.error(
          `${Object.keys(eduList[err.id])[err.key]} field of ${
            err.id + 1
          } education is in correct`,
          { position: 'top-left' },
        )
      })
      return
    }

    const { data } = await ProfileService.saveEducation(eduList)
    if (data) {
      toast.success('Saved successfully', { position: 'top-left' })
    }
  }

  const saveQualification = async () => {
    const { errors, isValid } = validateInputForm(quaList)

    if (!isValid) {
      errors.map((err) => {
        toast.error(
          `${Object.keys(quaList[err.id])[err.key]} field of ${
            err.id + 1
          } qualification is in correct`,
          { position: 'top-left' },
        )
      })
      return
    }

    const { data } = await ProfileService.saveQualification(quaList)
    if (data) {
      toast.success('Saved successfully', { position: 'top-left' })
    }
  }

  const savePublication = async () => {
    const { errors, isValid } = validateInputForm(pubList)

    if (!isValid) {
      errors.map((err) => {
        toast.error(
          `${Object.keys(pubList[err.id])[err.key]} field of ${
            err.id + 1
          } experience is in correct`,
          { position: 'top-left' },
        )
      })
      return
    }

    const { data } = await ProfileService.savePublication(pubList)
    if (data) {
      toast.success('Saved successfully', { position: 'top-left' })
    }
  }

  const saveLanguage = async () => {
    const { errors, isValid } = validateInputForm(langList)

    if (!isValid) {
      errors.map((err) => {
        toast.error(
          `${Object.keys(langList[err.id])[err.key]} field of ${
            err.id + 1
          } language is in correct`,
          { position: 'top-left' },
        )
      })
      return
    }

    const { data } = await ProfileService.saveLanguage(langList)
    if (data) {
      toast.success('Saved successfully', { position: 'top-left' })
    }
  }
  //==============================> Validate Function <===========================
  const validateInputForm = (list) => {
    const errors = []
    list.map((obj, index) => {
      if (Object.values(obj).includes(null)) {
        errors.push({ id: index, key: Object.values(obj).indexOf(null) })
      }
      if (Object.values(obj).includes('')) {
        errors.push({ id: index, key: Object.values(obj).indexOf('') })
      }
      if (Object.values(obj).includes({})) {
        errors.push({ id: index, key: Object.values(obj).indexOf({}) })
      }
    })
    return {
      errors,
      isValid: errors.length === 0,
    }
  }

  const isEmpty = (value) => {
    return (
      value === null ||
      typeof value === 'undefined' ||
      (typeof value === 'string' && value.trim().length === 0) ||
      (typeof value === 'object' && Object.keys(value).length === 0)
    )
  }

  ///============================> render <=========================///

  return (
    <div>
      <div className="bg-[#009800] xl:h-[49px] sm:h-[40px] h-[23px]" />
      <div
        className="bg-cover xl:h-[277px] sm:h-[205px] h-[101px]"
        style={
          backfile
            ? { backgroundImage: `url(${previewBack})` }
            : { backgroundImage: `url(${EditProfileBackImage})` }
        }
      />
      <div className="flex xl:w-[719px]  xl:mt-[-205px] mx-auto xl:mb-[8px] sm:w-[525px] sm:mt-[-130px] sm:mb-[6px] w-[360px] mt-[-70px] mb-[5px]">
        <input
          type="file"
          ref={refBack}
          className="hidden"
          onChange={handleChangeBack}
        />
        <Button
          className="btn bg-[#009800] text-white xl:text-[16px] sm:text-[10px] text-[8px] p-1  border-[white] border rounded-md"
          onClick={backUpload}
        >
          {t('editfreelancer.uploadcoverphoto')}
        </Button>
      </div>
      <div className="xl:w-[719px] sm:w-[525px] w-[360px] mx-auto">
        <div className="grid xl:grid-cols-4 sm:grid-cols-4 grid-cols-3  bg-white mb-[39px] rounded-md shadow-md  border-[gray] pb-5">
          <div className="grid grid-span-1 border-r border-[#DBE8CE] py-2">
            <div
              className="flex items-center justify-center hover:cursor-pointer"
              onClick={avartUpload}
            >
              <input
                type="file"
                ref={refAvart}
                className="hidden"
                onChange={handleChangeAvart}
              />
              {avartfile ? (
                <img
                  className="rounded-full xl:w-36 xl:h-36 sm:w-[100px] sm:h-[100px] w-[90px] h-[90px]"
                  src={previewAvart}
                  // alt={}
                />
              ) : !user?.profile_image ? (
                <Avatar className="rounded-full xl:w-36 xl:h-36 sm:w-[100px] sm:h-[100px] w-[90px] h-[90px]" />
              ) : (
                <img
                  className="rounded-full xl:w-36 xl:h-36 sm:w-[100px] sm:h-[100px] w-[90px] h-[90px]"
                  src={user?.profile_image}
                  alt={user?.username}
                />
              )}
            </div>
            <div>
              <p className="mb-1 text-center">
                {t('editfreelancer.hourlyrate')}
              </p>
              <div className="flex justify-center items-stretch xl:mb-4 sm:mb-2 mb-1 relative border xl:w-[172px] sm:w-[110px] w-[100px] border-[#DBE8CE] rounded-md mx-auto bg-[#F7F5F2]">
                <div className="flex -mr-px">
                  <span className="flex items-center px-1 text-sm whitespace-no-wrap rounded rounded-r-none bg-grey-lighter text-grey-dark xl:text-md">
                    $
                  </span>
                </div>
                <input
                  type="number"
                  className="flex-shrink flex-grow flex-auto w-px h-10 px-1 xl:text-[18px] sm:text-[14px] text-[12px] relative focus-visible:outline-0 bg-[#F7F5F2]"
                  placeholder=""
                  onChange={(e) => {
                    setProHourly(e.target.value)
                  }}
                />
                <div className="flex -mr-px">
                  <span className="flex items-center bg-grey-lighter rounded rounded-l-none  pr-1 whitespace-no-wrap text-grey-dark xl:text-xs sm:text-[10px] text-[8px]">
                    {t('editfreelancer.usdperhour')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <span className=" text-[#009800] border-[#009800] border-[2px]  shadow-md rounded-md p-1 xl:text-xs sm:text-[12px] text-[10px]">
                {t('editfreelancer.paymentverified')}
              </span>
            </div>
          </div>
          <div className="xl:col-start-2 xl:col-end-5 sm:col-start-2 sm:col-end-5 col-start-2 col-end-4 pl-[23px] pt-[33px] pr-[12px]">
            <div className="mb-[20px]">
              <span className="mr-[30px] xl:text-[18px] sm:text-[16px] text-[14px] font-bold">
                {user?.first_name + ' ' + user?.last_name}
              </span>
              <span className="xl:text-[16px] sm:text-[12px] text-[10px] text-gray">
                @{user?.username}
              </span>
            </div>
            <div className="mb-[15px]">
              <label className="block text-sm">
                {t('editfreelancer.professionalheadline')}
              </label>
              <input
                className="w-full px-2 py-2  border border-[#DBE8CE] rounded text-[12px] bg-[#F7F5F2] focus-visible:outline-[#009800]"
                type="text"
                placeholder=""
                onChange={(e) => {
                  setProHeadLine(e.target.value)
                }}
              />
            </div>
            <div className="mb-[15px]">
              <label className="block text-sm">
                {t('editfreelancer.summary')}
              </label>
              <textarea
                className="w-full h-[90px] px-2 py-2  border border-[#DBE8CE] rounded text-[12px] bg-[#F7F5F2] focus-visible:outline-[#009800]"
                type="text"
                placeholder=""
                onChange={(e) => {
                  setProSummary(e.target.value)
                }}
              />
            </div>
            <div className="flex justify-end mr-[15px]">
              <Button
                className="btn bg-[#009800] text-white text-[13px] p-1 w-[66px] border-[white] border rounded-md"
                onClick={saveProfile}
              >
                {t('editfreelancer.save')}
              </Button>
            </div>
          </div>
        </div>

        <div className=" bg-white mb-[39px] rounded-md shadow-lg border-[lightgray]">
          <div className="px-[18px] py-[10px]  border-[#DBE8CE] border-b">
            <p className="text-[16px]">{t('editfreelancer.contact')}</p>
          </div>
          <div className="px-[18px] py-[10px]  ">
            <div className="mb-[15px]">
              <label className="block text-sm">
                {t('editfreelancer.country')}
              </label>
              <Select
                options={countryList}
                value={country}
                onChange={(v) => setCountry(v)}
                placeholder=""
                className="mb-4 max-w-[232px] border border-[#DBE8CE] rounded-md sm:text-sm text-xs"
                components={{
                  IndicatorSeparator: () => null,
                }}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: '#009800',
                  },
                })}
              />
            </div>
            <div className="mb-[15px]">
              <label className="block text-sm">
                {t('editfreelancer.streetaddress')}
              </label>
              <input
                className="w-[328px] px-2 py-2  border border-[#DBE8CE] rounded text-[12px] bg-[#F7F5F2] focus-visible:outline-[#009800]"
                type="text"
                placeholder=""
                onChange={(e) => {
                  setStreet(e.target.value)
                }}
              />
            </div>
            <div className="mb-[15px] flex justify-between">
              <div className="w-4/12">
                <label className="block text-xs xl:text-md sm:text-sm">
                  {t('editfreelancer.stateprovince')}
                </label>
                <Select
                  options={stateList}
                  value={state}
                  onChange={(v) => setState(v)}
                  placeholder=""
                  className="mb-4 max-w-[232px] border border-[#DBE8CE] rounded-md sm:text-sm text-xs"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: '#009800',
                    },
                  })}
                />
              </div>
              <div className="w-5/12  mx-1 xl:mx-4 sm:mx-3">
                <label className="block text-xs xl:text-md sm:text-sm">
                  {t('editfreelancer.city')}
                </label>
                <Select
                  options={cityList}
                  value={city}
                  onChange={(v) => setCity(v)}
                  placeholder=""
                  className="mb-4 max-w-[232px] border border-[#DBE8CE] rounded-md sm:text-sm text-xs"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: '#009800',
                    },
                  })}
                />
              </div>
              <div className="w-3/12">
                <label className="block text-xs xl:text-md sm:text-sm">
                  {t('editfreelancer.zippostcode')}
                </label>
                <input
                  className="w-full px-2 py-2  border border-[#DBE8CE] rounded text-[12px] bg-[#F7F5F2] focus-visible:outline-[#009800]"
                  type="text"
                  required=""
                  placeholder=""
                  onChange={(e) => setZipPost(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-[15px]">
              <label className="block text-sm">
                {t('editfreelancer.phone')}
              </label>
              <PhoneInput
                country={country.value ? country.value.toLowerCase() : 'us'}
                value={phone}
                className=""
                onChange={(v) => setPhone(v)}
              />
            </div>
            <div className="flex justify-end">
              <Button
                className="btn bg-[#009800] text-white text-[13px] p-1 w-[66px] border-[white] border rounded-md"
                onClick={saveContact}
              >
                {t('editfreelancer.save')}
              </Button>
            </div>
          </div>
        </div>

        <div className=" bg-white xl:mb-[39px] sm:mb-[29px] mb-[16px] rounded-md shadow-lg border-[lightgray] pb-5">
          <div className="px-[18px] py-[10px]  border-[#DBE8CE] border-b">
            <p className="text-[16px]">{t('editfreelancer.skills')}</p>
          </div>
          <div className="xl:px-[18px] xl:py-[10px] xl:mx-[8px] sm:px-[14px] sm:py-[8px] sm:mx-[6px] px-[10px] py-[8px] mx-[5px]">
            <div className="mb-[15px] xl:mt-[38px] sm:mt-[20px] mt-[15px]">
              <div className="flex items-stretch xl:mb-4 sm:mb-3 mb-2 relative w-[328px] rounded-md  focus-visible:outline-[#009800]">
                <SearchSkill />
              </div>
            </div>
          </div>
          <div className="flex justify-around px-2">
            <SelectCategory
              categories={categories}
              setCategory={setSelectedCategory}
              category={selectedCategory}
            />
          </div>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-full h-px my-8 border-0 bg-gray opacity-20 dark:bg-gray" />
            <span className="absolute px-3 font-[18px] -translate-x-1/2 bg-white left-1/2 text-gray">
              {t('editfreelancer.or')}
            </span>
          </div>
          <div className="flex justify-around px-2">
            <SelectSkill
              categories={skillsByCategory}
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
            />
          </div>
          <div className="px-10 py-5">
            <div className="px-[5%] sm:px-[32px] mt-[10px] sm:mt-[33px]  w-full flex justify-between flex-col-reverse sm:flex-row gap-y-[10px]">
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
              {selectedSkills.map((item, key) => (
                <div
                  className="whitespace-nowrap text-[#717171] my-1 mx-2 py-[9px] px-[17px] text-[20px] leading-[15px] font-[500] border-solid border-[1px] border-[#989898] bg-white rounded-[25px]"
                  key={'content_skills' + key}
                >
                  {item.skill_name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mr-[15px]">
            <Button
              className="btn bg-[#009800] text-white text-[13px] p-1 w-[66px] border-[white] border rounded-md"
              onClick={saveSkills}
            >
              {t('editfreelancer.save')}
            </Button>
          </div>
        </div>

        <div className=" bg-white mb-[39px] rounded-md shadow-lg border-[lightgray] pb-5">
          <div className="flex justify-between px-[18px] py-[10px] mb-[15px] border-[#DBE8CE] border-b">
            <p className="text-[16px]">{t('editfreelancer.experience')}</p>
            <Button
              className="btn bg-white text-[#009800] text-[13px] p-1 w-[26px] leading-[20px] border border-solid border-[#009800] rounded-md mr-[5px]"
              onClick={addExperience}
            >
              <Plus className="w-[18px]" />
            </Button>
          </div>
          {expList.map((val, key) => {
            return (
              <div
                className="mb-[15px] px-[18px] border-b border-[lightgray]"
                key={'content_exp' + key}
              >
                {
                  <Button
                    className="float-right btn bg-white text-[#009800] text-[13px] p-1 w-[30px] h-[30px] min-w-[20px] leading-[20px] rounded-full mr-[5px]"
                    onClick={() => closeExperience(key)}
                  >
                    <Close />
                  </Button>
                }
                <div className="flex justify-between w-full">
                  <div className="w-1/2">
                    <label className="block text-sm">
                      {t('editfreelancer.title')}
                    </label>
                    <input
                      className="w-full px-2 py-2  border border-[#DBE8CE] rounded text-[12px] bg-[#F7F5F2] focus-visible:outline-[#009800]"
                      type="text"
                      placeholder="Enter your postion or title"
                      onChange={(e) => chExpTitle(e.target.value, key)}
                    />
                  </div>
                  <div className="w-1/2 ml-2">
                    <label className="block text-sm">
                      {t('editfreelancer.company')}
                    </label>
                    <input
                      className="w-full px-2 py-2  border border-[#DBE8CE] rounded text-[12px] bg-[#F7F5F2] focus-visible:outline-[#009800]"
                      type="text"
                      required=""
                      placeholder="Enter your Company name"
                      onChange={(e) => chExpCompany(e.target.value, key)}
                    />
                  </div>
                </div>
                <div className="flex justify-between w-full mb-[15px] mt-[10px]">
                  <div className="w-1/2">
                    <label className="block text-sm">
                      {t('editfreelancer.start')}
                    </label>
                    <div className="flex justify-between">
                      <Select
                        options={monthsList}
                        value={val.startmonth}
                        onChange={(m) => chExpStMonth(m, key)}
                        placeholder=""
                        className="mb-4 max-w-[232px] xl:w-[150px] sm:w-[110px] w-[75px] border border-[#DBE8CE] rounded-md sm:text-sm text-xs"
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: '#009800',
                          },
                        })}
                      />
                      <Select
                        options={yearsList}
                        value={val.startyear}
                        onChange={(y) => chExpStYear(y, key)}
                        placeholder=""
                        className="mb-4 max-w-[232px] xl:w-[150px] sm:w-[110px] w-[75px] border border-[#DBE8CE] rounded-md sm:text-sm text-xs"
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: '#009800',
                          },
                        })}
                      />
                    </div>
                  </div>
                  <div className="w-1/2 ml-2">
                    <label className="block text-sm">
                      {t('editfreelancer.end')}
                    </label>
                    <div className="flex justify-between">
                      <Select
                        options={monthsList}
                        value={val.endmonth}
                        onChange={(m) => chExpEnMonth(m, key)}
                        placeholder=""
                        className="mb-4 max-w-[232px] xl:w-[150px] sm:w-[110px] w-[75px] border border-[#DBE8CE] rounded-md sm:text-sm text-xs"
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: '#009800',
                          },
                        })}
                      />
                      <Select
                        options={yearsList}
                        value={val.endyear}
                        onChange={(y) => chExpEnYear(y, key)}
                        placeholder=""
                        className="mb-4 max-w-[232px] xl:w-[150px] sm:w-[110px] w-[75px] border border-[#DBE8CE] rounded-md sm:text-sm text-xs"
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: '#009800',
                          },
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-[15px]">
                  <label className="block text-sm">
                    {t('editfreelancer.summary')}
                  </label>
                  <textarea
                    className="w-full h-[90px] px-2 py-2  border border-[#DBE8CE] rounded text-[12px] bg-[#F7F5F2] focus-visible:outline-[#009800]"
                    type="text"
                    required=""
                    placeholder="Discribe your experience"
                    onChange={(e) => chExpSummary(e.target.value, key)}
                  />
                </div>
              </div>
            )
          })}
          <div className="flex justify-end mr-[15px]">
            {expList.length > 0 && (
              <Button
                className="btn bg-[#009800] text-white text-[13px] p-1 w-[66px] border-[white] border rounded-md"
                onClick={saveExperience}
              >
                {t('editfreelancer.save')}
              </Button>
            )}
          </div>
        </div>

        <div className=" bg-white mb-[39px] rounded-md shadow-lg border-[lightgray] pb-5">
          <div className="flex justify-between px-[18px] py-[10px] mb-[15px] border-[#DBE8CE] border-b">
            <p className="text-[16px]">{t('editfreelancer.education')}</p>
            <Button
              className="btn bg-white text-[#009800] text-[13px] p-1 w-[26px] leading-[20px] border border-solid border-[#009800] rounded-md mr-[5px]"
              onClick={addEducation}
            >
              <Plus className="w-[18px]" />
            </Button>
          </div>
          {eduList.map((val, key) => {
            return (
              <div key={'content_edu' + key}>
                <div className="flex flex-row-reverse px-[18px]">
                  {
                    <Button
                      className="float-right btn bg-white text-[#009800] text-[13px] p-1 w-[30px] h-[30px] min-w-[20px] leading-[20px] rounded-full mr-[5px]"
                      onClick={() => closeEducation(key)}
                    >
                      <Close />
                    </Button>
                  }
                </div>
                <div className="grid grid-cols-4 mb-[15px] px-[18px] border-b border-[lightgray]">
                  <div className="col-start-1 col-end-4 mb-[15px]">
                    <div className="grid grid-cols-2">
                      <div className="">
                        <label className="block text-sm">
                          {t('editfreelancer.country')}
                        </label>
                        <Select
                          options={countryList}
                          value={val.country}
                          onChange={(v) => chEduCountry(v, key)}
                          placeholder=""
                          className="mb-4 max-w-[232px] border border-[#DBE8CE] rounded-md sm:text-sm text-xs"
                          components={{
                            IndicatorSeparator: () => null,
                          }}
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary: '#009800',
                            },
                          })}
                        />
                      </div>
                      <div className="max-w-[250px] ml-1">
                        <label className="block text-sm ml-[5px]">
                          {t('editfreelancer.universitycollege')}
                        </label>
                        <input
                          className="w-full p-2  border border-[#DBE8CE] rounded text-[12px] bg-[#F7F5F2] focus-visible:outline-[#009800]"
                          type="text"
                          placeholder=""
                          onChange={(e) => chEduUniversity(e.target.value, key)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-start-1 col-end-5 mb-[25px]">
                    <label className="block text-sm">
                      {t('editfreelancer.degree')}
                    </label>
                    <input
                      className="w-full p-2  border border-[#DBE8CE] rounded text-[12px] bg-[#F7F5F2] focus-visible:outline-[#009800]"
                      type="text"
                      placeholder="Discribe your experience"
                      onChange={(e) => chEduDegree(e.target.value, key)}
                    />
                  </div>
                  <div className="col-start-1 col-end-2 mb-[15px]">
                    <label className="block text-sm pl-1">
                      {t('editfreelancer.startyear')}
                    </label>
                    <div className="mx-1">
                      <Select
                        options={yearsList}
                        value={val.startyear}
                        onChange={(v) => chEduStYear(v, key)}
                        placeholder=""
                        className="mb-4 max-w-[232px] border border-[#DBE8CE] rounded-md sm:text-sm text-xs"
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: '#009800',
                          },
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-start-2 col-end-3 mb-[15px]">
                    <label className="block text-sm pl-1">
                      {t('editfreelancer.endyear')}
                    </label>
                    <div className="mx-1">
                      <Select
                        options={yearsList}
                        value={val.endyear}
                        onChange={(v) => chEduEnYear(v, key)}
                        placeholder=""
                        className="mb-4 max-w-[232px] border border-[#DBE8CE] rounded-md sm:text-sm text-xs"
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: '#009800',
                          },
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="flex justify-end mr-[15px]">
            {eduList.length > 0 && (
              <Button
                className="btn bg-[#009800] text-white text-[13px] p-1 w-[66px] border-[white] border rounded-md"
                onClick={saveEducation}
              >
                {t('editfreelancer.save')}
              </Button>
            )}
          </div>
        </div>

        <div className=" bg-white mb-[39px] rounded-md shadow-lg border-[lightgray] pb-5">
          <div className="flex justify-between px-[18px] py-[10px] mx-[8px] mb-[15px] border-[#DBE8CE] border-b">
            <p className="text-[16px]">{t('editfreelancer.qualification')}</p>
            <Button
              className="btn bg-white text-[#009800] text-[13px] p-1 w-[26px] leading-[20px] border border-solid border-[#009800] rounded-md mr-[5px]"
              onClick={addQualification}
            >
              <Plus className="w-[18px]" />
            </Button>
          </div>
          {quaList.map((val, key) => {
            return (
              <div key={'content_qualification' + key}>
                <div className="flex flex-row-reverse px-[18px]">
                  {
                    <Button
                      className="float-right btn bg-white text-[#009800] text-[13px] p-1 w-[30px] h-[30px] min-w-[20px] leading-[20px] rounded-full mr-[5px]"
                      onClick={() => closeQualification(key)}
                    >
                      <Close />
                    </Button>
                  }
                </div>
                <div
                  className="grid grid-cols-4 mb-[15px] border-[#DBE8CE] border-b"
                  key={'content_qualification' + key}
                >
                  <div className="col-start-1 xl:col-end-3 sm:col-end-3 col-end-5 xl:mb-[15px] sm:mb-[15px] mb-[15px] mx-[18px]">
                    <label className="block text-sm">
                      {t('editfreelancer.professionalcertification')}
                    </label>
                    <input
                      className="w-full px-2 py-2  border border-[#DBE8CE] rounded text-[12px] bg-[#F7F5F2] focus-visible:outline-[#009800]"
                      type="text"
                      placeholder="Enter Professional Certificate or Award"
                      onChange={(e) => chQuProfAward(e.target.value, key)}
                    />
                  </div>
                  <div className="col-start-1 xl:col-start-3 sm:col-start-3 col-end-5 mb-[10px] mx-[18px]">
                    <label className="block text-sm">
                      {t('editfreelancer.conferringorganization')}
                    </label>
                    <input
                      className="w-full px-2 py-2  border border-[#DBE8CE] rounded text-[12px] bg-[#F7F5F2] focus-visible:outline-[#009800]"
                      type="text"
                      placeholder="Enter Conferring Organization"
                      onChange={(e) => chQuConfOragan(e.target.value, key)}
                    />
                  </div>
                  <div className="col-start-1 col-end-5 mb-[10px] mx-[18px]">
                    <label className="block text-sm">
                      {t('editfreelancer.summary')}
                    </label>
                    <textarea
                      className="w-full h-[90px] px-2 py-2  border border-[#DBE8CE] rounded text-[12px] bg-[#F7F5F2] focus-visible:outline-[#009800]"
                      type="text"
                      placeholder="Discribe your experience"
                      onChange={(e) => chQuSummary(e.target.value, key)}
                    />
                  </div>
                  <div className="col-start-1 col-end-3 mb-[10px] mx-[18px]">
                    <label className="block text-sm">
                      {t('editfreelancer.start')}
                    </label>
                    <div className="">
                      <Select
                        options={yearsList}
                        value={val.startyear}
                        onChange={(y) => chQuStYear(y, key)}
                        placeholder=""
                        className="mb-4 max-w-[232px] border border-[#DBE8CE] rounded-md sm:text-sm text-xs"
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: '#009800',
                          },
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="flex  justify-end mr-[15px]">
            {quaList.length > 0 && (
              <Button
                className="btn bg-[#009800] text-white text-[13px] p-1 w-[66px] border-[white] border rounded-md"
                onClick={saveQualification}
              >
                {t('editfreelancer.save')}
              </Button>
            )}
          </div>
        </div>

        <div className=" bg-white mb-[39px] rounded-md shadow-lg border-[lightgray] pb-5">
          <div className="flex justify-between px-[18px] py-[10px] mx-[8px] mb-[15px] border-[#DBE8CE] border-b">
            <p className="text-[16px]">{t('editfreelancer.publication')}</p>
            <Button
              className="btn bg-white text-[#009800] text-[13px] p-1 w-[26px] leading-[20px] border border-solid border-[#009800] rounded-md mr-[5px]"
              onClick={addPublication}
            >
              <Plus className="w-[18px]" />
            </Button>
          </div>
          {pubList.map((val, key) => {
            return (
              <div key={'content_publication' + key}>
                <div className="flex flex-row-reverse px-[18px]">
                  {
                    <Button
                      className="float-right btn bg-white text-[#009800] text-[13px] p-1 w-[30px] h-[30px] min-w-[20px] leading-[20px] rounded-full mr-[5px]"
                      onClick={() => closePublication(key)}
                    >
                      <Close />
                    </Button>
                  }
                </div>
                <div className="grid grid-cols-4 mb-[15px] border-[#DBE8CE] border-b">
                  <div className="col-start-1 col-end-3 mb-[25px] mx-[18px]">
                    <label className="block text-sm">
                      {t('editfreelancer.publicationtitle')}
                    </label>
                    <input
                      className="w-full px-2 py-2  border border-[#DBE8CE] rounded text-[12px] bg-[#F7F5F2] focus-visible:outline-[#009800]"
                      type="text"
                      placeholder="Enter the publication Title"
                      onChange={(e) => chPuTitle(e.target.value, key)}
                    />
                  </div>
                  <div className="col-start-3 col-end-5 mb-[15px] mx-[18px]">
                    <label className="block text-sm">
                      {t('editfreelancer.publisher')}
                    </label>
                    <input
                      className="w-full px-2 py-2  border border-[#DBE8CE] rounded text-[12px] bg-[#F7F5F2] focus-visible:outline-[#009800]"
                      type="text"
                      placeholder="Enter the publisher"
                      onChange={(e) => chPuPublisher(e.target.value, key)}
                    />
                  </div>
                  <div className="col-start-1 col-end-5 mb-[25px] mx-[18px]">
                    <label className="block text-sm">
                      {t('editfreelancer.summary')}
                    </label>
                    <textarea
                      className="w-full h-[90px] px-2 py-2  border border-[#DBE8CE] rounded text-[12px] bg-[#F7F5F2] focus-visible:outline-[#009800]"
                      type="text"
                      placeholder="Discribe your work experience"
                      onChange={(e) => chPuSummay(e.target.value, key)}
                    />
                  </div>
                </div>
              </div>
            )
          })}
          <div className="flex justify-end mr-[15px]">
            {pubList.length > 0 && (
              <Button
                className="btn bg-[#009800] text-white text-[13px] p-1 w-[66px] border-[white] border rounded-md"
                onClick={savePublication}
              >
                {t('editfreelancer.save')}
              </Button>
            )}
          </div>
        </div>

        <div className=" bg-white mb-[39px] rounded-md shadow-lg border-[lightgray] pb-5">
          <div className="flex justify-between px-[18px] py-[10px] mx-[8px] mb-[20px] border-[#DBE8CE] border-b">
            <p className="text-[16px]">{t('editfreelancer.languages')}</p>
            <Button
              className="btn bg-white text-[#009800] text-[13px] p-1 w-[26px] leading-[20px] border border-solid border-[#009800] rounded-md mr-[5px]"
              onClick={addLanguage}
            >
              <Plus className="w-[18px]" />
            </Button>
          </div>
          <div className="px-[18px] py-[10px] mx-[8px] mb-[20px] border-[#DBE8CE] border-b">
            <div className="mb-[15px]">
              <p className="text-[12px]">
                {lng
                  ? 'Looking good. Next, tell us which Languages you speak'
                  : 'تبدو جيدة. بعد ذلك ، أخبرنا باللغات التي تتحدثها'}
              </p>
              <br />
              <p className="text-[12px]">
                {lng
                  ? 'Readymade is global, so clients are often interested to know what languages you speak. English is a must, but do you speak any other languages?'
                  : 'تعد Readymade عالمية ، لذلك غالبًا ما يهتم العملاء بمعرفة اللغات التي تتحدثها. اللغة الإنجليزية أمر لا بد منه ، لكن هل تتحدث أي لغة أخرى؟'}
              </p>
            </div>

            <div className="flex flex-wrap justify-between mb-1">
              <div className="w-5/12 pr-[5px]">
                <label className="text-sm ml-[5px]">
                  {t('editfreelancer.language')}
                </label>
              </div>
              <div className="w-5/12 pr-[5px]">
                <label className="text-sm ml-[5px]">
                  {t('editfreelancer.proficiency')}
                </label>
              </div>
              <div className="w-2/12 flex flex-col justify-center" />
            </div>

            {langList.map((val, key) => {
              return (
                <div
                  className="flex flex-wrap justify-between mb-1"
                  key={'content_lang' + key}
                >
                  <div className="w-5/12 pr-[5px]">
                    <div className="">
                      <Select
                        options={Languages}
                        value={val.lang}
                        onChange={(v) => selectLanguage(v, key)}
                        placeholder="Languages"
                        className="mb-1 max-w-[232px] border border-[#DBE8CE] rounded-md sm:text-sm text-xs"
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: '#009800',
                          },
                        })}
                      />
                    </div>
                  </div>
                  <div className="w-5/12 pr-[5px]">
                    <div className="">
                      <Select
                        options={proficiencyList}
                        value={val.prof}
                        onChange={(v) => selectProficiency(v, key)}
                        className="mb-1 max-w-[232px] border border-[#DBE8CE] rounded-md sm:text-sm text-xs"
                        placeholder="My Level is"
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: '#009800',
                          },
                        })}
                      />
                    </div>
                  </div>
                  <div className="w-2/12 flex flex-col justify-center">
                    {
                      <Button
                        className="btn bg-white text-[#009800] text-[13px] p-1 w-[30px] h-[30px] min-w-[20px] leading-[20px] rounded-full mr-[5px]"
                        onClick={() => closeLangeset(key)}
                      >
                        <Close />
                      </Button>
                    }
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex justify-end mr-[15px]">
            {langList.length > 0 && (
              <Button
                className="btn bg-[#009800] text-white text-[13px] p-1 w-[66px] border-[white] border rounded-md"
                onClick={saveLanguage}
              >
                {t('editfreelancer.save')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreelancerEditProfile
