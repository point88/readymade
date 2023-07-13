import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { Button } from '@mui/material'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import ProjectTypeCard from '../../Components/Cards/PostProject/project-type'
import PostCard from '../../Components/Cards/PostProject'
import CustomSelect from '../../Components/Input/select'
import CustomInput from '../../Components/Input'
import Stage from '../../Components/Stage'
import { CURRENCY_TYPE } from '../../Services/constants/accountType'
import AuthService from '../../Services/auth'
import PostService from '../../Services/post'
import { ReactComponent as Lamp } from '../../Assests/Images/lamp.svg'
import { ReactComponent as Attach } from '../../Assests/Images/attach.svg'
import Hourglass from '../../Assests/Images/hourglass.svg'
import Folder from '../../Assests/Images/folder.svg'
import Trophy from '../../Assests/Images/trophy.svg'
import Shield from '../../Assests/Images/shield.svg'
import Setting from '../../Assests/Images/setting.svg'
import { useIsMobile } from '../../Utils/Hooks/useWindowSize'
import { callbackURL } from '../../Services/constants/accountType'
import Checkout from './Checkout'
import i18n from '../../i18n'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const PostProject = () => {
  const uploadRef = useRef()
  const rangeRef = useRef()
  const { isMobile } = useIsMobile()
  // const navigate = useNavigate()
  const lng = i18n.language === 'en' ? true : false
  const user = AuthService.getUser()
  const { t } = useTranslation()
  const [step, setStep] = useState(0)
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [files, setFiles] = useState([])
  const [skills, setSkills] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])
  const [role, setRole] = useState(false)
  const [payType, setPayType] = useState(false)
  const [currencyType, setCurrencyType] = useState('USD')
  const [projectType, setProjectType] = useState(false)
  const [projectTypes, setProjectTypes] = useState({
    recruiter: false,
    nda: false,
    ipagreement: false,
    featured: false,
  })
  const [paymentAmount, setPaymentAmount] = useState(0)

  const onAttach = () => {
    uploadRef.current.browse()
  }

  const handleRangeStyle = () => {
    !!rangeRef.current &&
      (rangeRef.current.oninput = function () {
        var value = ((this.value - this.min) / (this.max - this.min)) * 100
        this.style.background = lng
          ? 'linear-gradient(to right, #008C00 0%, #008C00 ' +
            value +
            '%, #e6e6e6 ' +
            value +
            '%, #e6e6e6 100%)'
          : 'linear-gradient(to left, #008C00 0%, #008C00 ' +
            value +
            '%, #e6e6e6 ' +
            value +
            '%, #e6e6e6 100%)'
      })
  }

  const handleProjectNext = () => {
    setStep(1)
    document
      .getElementById('SelectSkills')
      .scrollIntoView({ behavior: 'smooth' })
  }

  const handleSkillsNext = () => {
    setStep(2)
    document
      .getElementById('SelectPostProject')
      .scrollIntoView({ behavior: 'smooth' })
  }

  const handlePostNext = (value) => {
    setStep(3)
    setRole(value)
    document
      .getElementById('SelectPayType')
      .scrollIntoView({ behavior: 'smooth' })
  }

  const handleProjectType = (value) => {
    setProjectTypes({
      ...projectTypes,
      recruiter: value,
    })
    setProjectType(value)
  }

  const handlePaymentNext = () => {
    setStep(4)
    document
      .getElementById('SelectProjectType')
      .scrollIntoView({ behavior: 'smooth' })
  }

  const handleContestPaymentNext = () => {
    setStep(5)
    document
      .getElementById('SelectContestProjectType')
      .scrollIntoView({ behavior: 'smooth' })
  }

  const handleProjectDetailNext = () => {
    setStep(5)
    document
      .getElementById('SelectPaymentType')
      .scrollIntoView({ behavior: 'smooth' })
  }

  const handlePost = async () => {
    const payload = {
      title: projectName,
      description: projectDescription,
      is_contest: role,
      is_hourly: !payType,
      is_recruiter_project: Boolean(projectTypes?.recruiter),
      currency_type: currencyType,
      payment_amount: paymentAmount,
      skills: selectedSkills.map((e) => e.value),
      filepond: files.map((file) => file.serverId),
      user_id: user.pk,
      payment_type_id: 1,
    }
    await PostService.postProject(payload)
    setStep(step + 1)
  }

  const handlePaymentVerify = (data) => {
    const payload = {
      amount: paymentAmount,
      currency: currencyType,
      cardholder_name: data.cardholderName,
      card_number: data.cardNumber.replace(/ /g, ''),
      cvc: data.cvc,
      expire_month: data.date.split('/')[0],
      expire_year: '20' + data.date.split('/')[1],
      callback_url: callbackURL,
    }
    PostService.createPayment(payload)
  }

  useEffect(() => {
    async function getSkills() {
      const result = await PostService.getAllSkills()
      setSkills(result?.map((e) => ({ value: e.id, label: e.skill_name })))
    }

    getSkills()
  }, [])

  useEffect(() => {
    handleRangeStyle()
  }, [handleRangeStyle])

  useEffect(() => {
    setPaymentAmount(1 * Object.values(projectTypes).filter((e) => e).length)
  }, [projectTypes])

  const HourlySelect = () => {
    const currencyHourlyRange = [
      { value: 0, label: 'Basic ($15.00 - 20.00 per hour)' },
      { value: 1, label: 'Moderate ($20.00 - 25.00 per hour)' },
      { value: 2, label: 'Standard ($25.00 - 30.00 per hour)' },
      { value: 3, label: 'Skilled ($30.00 - 35.00 per hour)' },
      { value: 4, label: 'Expert ($35.00 - 40.00 per hour)' },
    ]

    return (
      <Select
        defaultValue={currencyHourlyRange[0]}
        options={currencyHourlyRange}
        styles={{
          control: (styles) => ({
            ...styles,
            padding: isMobile ? '0' : '5px 10px',
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
        }}
      />
    )
  }

  const FixedSelect = () => {
    const currencyFixedRange = [
      { value: 0, label: 'Micro Project ($10.00 - 30.00 USD)' },
      { value: 1, label: 'Simple Project ($30.00 - 250.00 USD)' },
      { value: 2, label: 'Very Small Project ($250.00 - 750.00 USD)' },
      { value: 3, label: 'Small Project ($750.00 - 1500.00 USD)' },
      { value: 4, label: 'Medium Project ($1500.00 - 3000.00 USD)' },
      { value: 5, label: 'Large Project ($3000.00 - 5000.00 USD)' },
      { value: 6, label: 'Larger Project ($5000.00 - 10000.00 USD)' },
      { value: 7, label: 'Very Large Project ($10000.00 - 20000.00 USD)' },
      { value: 8, label: 'Huge Project ($20000.00 - 50000.00 USD)' },
      { value: 9, label: 'Major Project ($50000.00+ USD)' },
    ]

    return (
      <Select
        defaultValue={currencyFixedRange[0]}
        options={currencyFixedRange}
        styles={{
          control: (styles) => ({
            ...styles,
            padding: isMobile ? '0' : '5px 10px',
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
        }}
      />
    )
  }

  return (
    <div
      className="w-full relative bg-bgd z-0 py-0 xl:py-10"
      dir={lng ? 'ltr' : 'rtl'}
    >
      <div dir="ltr">
        <Stage step={step} />
      </div>
      {step >= 0 && (
        <div>
          <div className="h-[450px] w-full bg-yellow absolute -z-10"></div>
          <div className="py-[33px] text-center sm:text-left lg:py-12 px-[33px] sm:px-[59px] lg:px-40 z-10">
            <div className="text-[22px] sm:text-2xl lg:text-3xl leading-10 font-bold">
              {t('post.title')}
            </div>
            <div className="text-xs sm:text-sm lg:text-base leading-[20px] sm:leading-[22px] lg:leading-7 xl:w-2/3 md:w-full mt-2 sm:mt-4 lg:mt-5">
              {t('post.subtitle')}
            </div>
          </div>
          <div className="px-[23px] lg:px-20">
            <div className="w-full border border-darkgreen rounded-xl lg:rounded-none bg-lightgray px-[23px] lg:px-20 pb-5 pt-5">
              <CustomInput
                type="text"
                title={t('post.choosename')}
                placeholder={t('post.choosenameplaceholder')}
                handleChange={setProjectName}
              />
              <CustomInput
                type="textarea"
                title={t('post.tellus')}
                placeholder={t('post.tellusplaceholder')}
                className="mt-3"
                handleChange={setProjectDescription}
              />
              <div
                className="mt-5 w-full py-3 bg-white border rounded-md border-darkgreen/[0.25] px-5 flex items-center justify-start"
                dir={'ltr'}
              >
                {/* <div className="w-0 overflow-hidden">
              <input type="file" ref={uploadRef} name="fileUpload" />
            </div> */}
                <button
                  className="hidden sm:flex justify-center items-center bg-lightgray shadow-md px-4 py-2"
                  onClick={onAttach}
                >
                  <Attach className="mr-2" />
                  {t('post.attachfile')}
                </button>
                {!!files?.length ? (
                  <div className="mx-auto">
                    {files.map((file) => (
                      <div key={file.id}>{file.filename}</div>
                    ))}
                  </div>
                ) : (
                  <div
                    className={`${
                      lng ? 'w-full sm:w-2/3' : 'w-full text-right'
                    } text-center sm:text-left ml-0 sm:ml-5 text-xs sm:text-sm lg:text-base`}
                  >
                    {t('post.attachfiledescription')}
                  </div>
                )}
              </div>
              <button
                className="flex sm:hidden justify-center items-center mx-auto mt-5 bg-lightgray shadow-md px-4 py-2 text-[13px]"
                onClick={onAttach}
              >
                <Attach className="mr-2" />
                {t('post.attachfile')}
              </button>
              <FilePond
                ref={uploadRef}
                files={files}
                allowReorder={true}
                onupdatefiles={setFiles}
                server={process.env.REACT_APP_BASE_URL + '/fp/process/'}
                labelIdle=""
                className="hidden"
                credits={{ label: '', url: '' }}
              />
              {step === 0 && (
                <div
                  className="mt-10 flex items-center flex-col sm:flex-row-reverse  lg:flex-row lg:justify-start"
                  id="SelectSkills"
                >
                  <Button
                    className={`${
                      lng ? 'font-[poppins]' : 'font-[almarai]'
                    } normal-case w-20 lg:w-28 h-9 lg:h-12 bg-[#009800] flex justify-center items-center cursor-pointer text-[18px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
                    onClick={handleProjectNext}
                  >
                    {t('nextbutton')}
                  </Button>
                  <div
                    className={`hidden sm:block mt-3 sm:mt-0 text-[12px] lg:text-lg mx-5`}
                  >
                    {t('post.pressctrl')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="lg:px-20 pb-5">
        <div className="mx-[45px] lg:mx-10 mt-[29px] lg:mt-16">
          {step >= 1 && (
            <>
              <div className="font-bold text-xl sm:text-2xl lg:text-4xl">
                {t('post.whatskills')}
              </div>
              <div className="my-5 text-xs sm:text-sm lg:text-[16px]">
                {t('post.enterup')}
              </div>
              <CustomSelect options={skills} handleChange={setSelectedSkills} />
              <div className="mt-5" dir="ltr">
                <div
                  className={`text-sm lg:text-xl text-black ${
                    lng ? 'text-start' : 'text-end'
                  }`}
                >
                  {t('post.suggested')}{' '}
                  <span className="text-lightgreen">
                    {t('post.suggestedskills')}
                  </span>
                </div>
              </div>
              {step === 1 && (
                <div
                  className="mt-[17px] lg:mt-10 flex items-center flex-col sm:flex-row-reverse lg:flex-row lg:justify-start"
                  id="SelectPostProject"
                >
                  <Button
                    className={`${
                      lng ? 'font-[poppins]' : 'font-[almarai]'
                    } normal-case w-20 lg:w-28 h-9 lg:h-12 bg-[#009800] flex justify-center items-center cursor-pointer text-[18px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
                    onClick={handleSkillsNext}
                  >
                    {t('nextbutton')}
                  </Button>
                  <div className={`mt-3 sm:mt-0 text-[12px] lg:text-lg mx-5`}>
                    {t('post.pressctrl')}
                  </div>
                </div>
              )}
            </>
          )}
          {step >= 2 && (
            <>
              <div className="text-darkblack text-xl sm:text-2xl lg:text-[33px] font-bold mt-16">
                {t('post.howwouldyoulike')}
              </div>
              <div
                className={`mt-5 rounded-lg border border-green ${
                  lng ? 'border-l-8' : 'border-r-8'
                } flex items-center`}
              >
                <Lamp
                  className={`${
                    lng ? 'ml-3' : 'mr-3'
                  } min-h-[88px] text-base leading-6`}
                />
                <div
                  className={`${
                    lng ? 'ml-3' : 'mr-3'
                  } ml-3 text-darkblack text-[11px] sm:text-sm lg:text-[16px]`}
                >
                  {t('post.highlight')}
                </div>
              </div>
              <div
                className="mt-5 flex gap-0 lg:gap-10 flex-1 flex-col lg:flex-row"
                id="SelectPayType"
              >
                <PostCard
                  title={t('post.projecttitle1')}
                  description={t('post.projectdescription1')}
                  icon={Folder}
                  isRecommend
                  selected={!role}
                  onClick={() => handlePostNext(false)}
                />
                <PostCard
                  title={t('post.projecttitle2')}
                  description={t('post.projectdescription2')}
                  icon={Trophy}
                  selected={role}
                  onClick={() => handlePostNext(true)}
                />
              </div>
            </>
          )}
          {step >= 3 && (
            <>
              {!role ? (
                <>
                  <div className="text-darkblack text-xl sm:text-2xl lg:text-[33px] font-bold mt-8 sm:mt-16">
                    {t('post.howtopay')}
                  </div>
                  <div className="mt-0 sm:mt-5 flex gap-0 sm:gap-10 flex-1 flex-col sm:flex-row">
                    <PostCard
                      title={t('post.paytitle1')}
                      description={t('post.paydescription1')}
                      icon={Hourglass}
                      isRecommend
                      selected={!payType}
                      onClick={() => setPayType(false)}
                    />
                    <PostCard
                      title={t('post.paytitle2')}
                      description={t('post.paydescription2')}
                      icon={Shield}
                      selected={payType}
                      onClick={() => setPayType(true)}
                    />
                  </div>
                  <div className="text-darkblack text-[19px] font-bold lg:font-normal lg:text-[28px] mt-5 sm:mt-16">
                    {t('post.estimatebudget')}
                  </div>
                  <div className="flex flex-col sm:flex-row lg:flex-col justify-between lg:justify-center">
                    <div
                      className={`flex gap-2 sm:gap-10 mt-3 ${
                        lng ? '' : 'flex-row-reverse'
                      }`}
                      dir="ltr"
                    >
                      <Select
                        defaultValue={CURRENCY_TYPE[0]}
                        options={CURRENCY_TYPE}
                        onChange={(value) => setCurrencyType(value.label)}
                        styles={{
                          control: (styles) => ({
                            ...styles,
                            padding: isMobile ? '0' : '5px 10px',
                          }),
                          indicatorSeparator: () => ({
                            display: 'none',
                          }),
                        }}
                      />
                      {!payType && <HourlySelect />}
                      {payType && <FixedSelect />}
                    </div>
                    {step === 3 && (
                      <div
                        className="mt-3 lg:mt-10 flex items-center flex-col sm:flex-row-reverse lg:flex-row lg:justify-start"
                        id="SelectProjectType"
                      >
                        <Button
                          className={`${
                            lng ? 'font-[poppins]' : 'font-[almarai]'
                          } normal-case w-20 lg:w-28 h-9 lg:h-12 bg-[#009800] flex justify-center items-center cursor-pointer text-[18px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
                          onClick={handlePaymentNext}
                        >
                          {t('nextbutton')}
                        </Button>
                        <div
                          className={`hidden sm:block text-[12px] lg:text-lg mx-5`}
                        >
                          {t('post.pressenter')}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-darkblack text-xl sm:text-2xl lg:text-[33px] font-bold mt-5 sm:mt-16">
                    {t('post.whatbudget')}
                  </div>
                  <div className="rounded-md mt-8 border border-lightgreen">
                    <div className="rounded-md outline outline-2 outline-yellow text-center py-1 sm:py-3 bg-yellow">
                      <div className="text-[15px] sm:text-[19px] lg:text-[23px] font-bold">
                        {t('post.greatresult')}
                      </div>
                      <div className="text-xs sm:text-base lg:text-base">
                        {t('post.expectaround')}
                      </div>
                    </div>
                    <div className="p-3 sm:p-10">
                      <input
                        type="range"
                        className="customrange accent-white h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#e6e6e6]"
                        id="customRange"
                        ref={rangeRef}
                        min={0}
                        max={1500}
                        step={0.01}
                        value={paymentAmount}
                        onChange={(e) => {
                          setPaymentAmount(Number(e.target.value))
                          // setPaymentFee(parseInt(e.target.value * 5) / 100)
                        }}
                      />
                      <div className="w-full flex justify-between text-xs sm:text-md mt-1 sm:mt-4">
                        <div>$10 USD</div>
                        <div>$1500.00 USD</div>
                      </div>
                      <div
                        className={`mt-5 flex gap-10 ${
                          lng ? '' : 'flex-row-reverse'
                        }`}
                        dir="ltr"
                      >
                        <div className="w-1/2 h-[38px] sm:h-12 focus:outline-none px-5 bg-transparent border border-lightgreen2 rounded-sm flex items-center">
                          {paymentAmount}
                        </div>
                        <Select
                          defaultValue={CURRENCY_TYPE[0]}
                          className="w-1/2"
                          onChange={(value) => setCurrencyType(value.label)}
                          options={CURRENCY_TYPE}
                          styles={{
                            control: (styles) => ({
                              ...styles,
                              padding: isMobile ? '0' : '5px 10px',
                              background: 'transparent',
                              borderColor: '#008d00',
                            }),
                            indicatorSeparator: () => ({
                              display: 'none',
                            }),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {step === 3 && (
                    <div
                      className="mt-5 flex items-center flex-col sm:flex-row-reverse lg:flex-row lg:justify-start"
                      id="SelectContestProjectType"
                    >
                      <Button
                        className={`${
                          lng ? 'font-[poppins]' : 'font-[almarai]'
                        } normal-case w-20 lg:w-28 h-9 lg:h-12 bg-[#009800] flex justify-center items-center cursor-pointer text-[18px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
                        onClick={handleContestPaymentNext}
                      >
                        {t('nextbutton')}
                      </Button>
                      <div
                        className={`hidden sm:block text-xs lg:text-lg mx-5`}
                      >
                        {t('post.pressenter')}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
          {step >= 4 && !role && (
            <>
              <div className="text-darkblack font-bold sm:font-normal text-xl sm:text-2xl lg:text-[28px] mt-10">
                {t('post.whattypeofproject')}
              </div>
              <div className="mt-0 sm:mt-5 flex gap-0 sm:gap-10 flex-1 flex-col sm:flex-row">
                <PostCard
                  title={t('post.postingtypetitle1')}
                  description={t('post.postingtypedescription1')}
                  rate={t('post.postingtyperate1')}
                  icon={Folder}
                  selected={!projectType}
                  onClick={() => handleProjectType(false)}
                />

                <PostCard
                  title={t('post.postingtypetitle2')}
                  description={t('post.postingtypedescription2')}
                  rate={t('post.postingtyperate2') + currencyType}
                  icon={Setting}
                  isRecommend
                  selected={projectType}
                  onClick={() => handleProjectType(true)}
                />
              </div>
              {projectType && (
                <>
                  <div className="text-darkblack font-bold sm:font-normal text-xl sm:text-[28px] my-5">
                    {t('post.chooseupgrades')}
                  </div>
                  <ProjectTypeCard
                    onChange={setProjectTypes}
                    projectTypes={projectTypes}
                    value={'recruiter'}
                    title={t('post.recruiter')}
                    bio={t('post.recruiterbio')}
                    range={1}
                    currencyType={currencyType}
                    isPrimary
                  />
                  <ProjectTypeCard
                    onChange={setProjectTypes}
                    projectTypes={projectTypes}
                    value={'nda'}
                    title={t('post.nda')}
                    bio={t('post.ndabio')}
                    currencyType={currencyType}
                    range={1}
                  />
                  <ProjectTypeCard
                    onChange={setProjectTypes}
                    projectTypes={projectTypes}
                    value={'ipagreement'}
                    title={t('post.ipagreement')}
                    bio={t('post.ipagreementbio')}
                    currencyType={currencyType}
                    range={1}
                    isPrimary
                  />
                  <ProjectTypeCard
                    onChange={setProjectTypes}
                    projectTypes={projectTypes}
                    value={'featured'}
                    title={t('post.featured')}
                    bio={t('post.featuredbio')}
                    currencyType={currencyType}
                    range={1}
                  />
                </>
              )}
              {step === 4 && (
                <div
                  className="mt-10 flex items-center flex-row-reverse lg:flex-row justify-center lg:justify-start"
                  id="SelectPaymentType"
                >
                  <Button
                    className={`${
                      lng ? 'font-[poppins]' : 'font-[almarai]'
                    } normal-case w-20 lg:w-28 h-9 lg:h-12 bg-[#009800] flex justify-center items-center cursor-pointer text-[18px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
                    onClick={handleProjectDetailNext}
                  >
                    {t('nextbutton')}
                  </Button>
                  <div
                    className={`hidden sm:block text-[12px] lg:text-lg mx-5`}
                  >
                    {t('post.pressenter')}
                  </div>
                </div>
              )}
            </>
          )}
          {step >= 5 && (
            <div className="p-0 lg:p-10">
              <div className="text-darkblack text-xl sm:text-2xl lg:text-[33px] font-bold mt-5 sm:mt-16">
                {t('post.arethesedetails')}
              </div>
              <div className="mt-5 border border-lightgreen2 shadow-md rounded-md p-5 flex">
                <div className="w-[140px] min-w-[140px] lg:min-w-[200px] p-2 lg:p-16 flex items-center justify-center">
                  <img src={Folder} className="scale-150" alt="Folder" />
                </div>
                <div className="border border-lightgreen2 mx-5"></div>
                <div className="p-0 lg:p-5">
                  <div className="font-bold break-all lg:font-normal text-[15px] sm:text-[19px] lg:text-[29px]">
                    {projectName}
                  </div>
                  <div className="mt-1 sm:mt-3 text-xs sm:text-sm lg:text-base break-all">
                    {projectDescription}
                  </div>
                  <div className="flex flex-row flex-1 flex-wrap gap-5 text-base mt-3">
                    {selectedSkills.map((skill) => (
                      <div
                        className="rounded-full px-2 lg:px-4 py-1 flex items-center text-sm lg:text-base border border-darkgray text-lightgray2 bg-white"
                        key={skill.value}
                      >
                        <div>{skill.label}</div>
                        <div className="ml-2 lg:ml-4">x</div>
                      </div>
                    ))}
                  </div>
                  {projectTypes.recruiter && (
                    <div className="mt-5 bg-lightgreen px-4 py-1 text-base text-white rounded-full text-center w-[130px]">
                      {t('post.recruiter')}
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`mt-5 sm:mt-16 rounded-lg border border-green ${
                  lng ? 'border-l-8' : 'border-r-8'
                } flex items-center`}
              >
                <Lamp
                  className={`${
                    lng ? 'ml-3' : 'mr-3'
                  } min-h-[53px] text-base leading-6`}
                />
                <div
                  className={`${
                    lng ? 'ml-3' : 'mr-3'
                  } text-darkblack text-xs sm:text-sm lg:text-base`}
                >
                  {t('post.yourprojectwillbe')}
                </div>
              </div>
              <div className="my-5 flex items-center flex-row sm:flex-row-reverse lg:flex-row lg:justify-start">
                <Button
                  className={`${
                    lng ? 'font-[poppins]' : 'font-[almarai]'
                  } normal-case h-8 sm:h-[50px] bg-[#009800] px-2 sm:px-12 flex rounded-md justify-center items-center cursor-pointer text-sm sm:text-base font-[500] leading-2 sm:leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
                  onClick={handlePost}
                >
                  {t('post.postmyproject')}
                </Button>
                <div
                  className={`font-bold sm:font-normal text-base sm:text-lg mx-5`}
                >
                  {t('post.total')}: ${paymentAmount} {currencyType}
                </div>
              </div>
              <div
                className={`${
                  lng ? 'ml-3' : 'mr-3'
                } text-darkblack text-xs sm:text-sm lg:text-base`}
              >
                {t('post.postprojectdescription')}{' '}
                <Link
                  to={'/'}
                  className="text-lightgreen text-sm sm:text-base lg:text-lg"
                >
                  {t('post.term')}
                </Link>{' '}
                {t('post.and')}{' '}
                <Link
                  to={'/'}
                  className="text-lightgreen text-sm sm:text-base lg:text-lg"
                >
                  {t('post.privacy')}
                </Link>{' '}
                <br />
                {t('post.copyright')}{' '}
              </div>
            </div>
          )}
        </div>
        {step >= 6 && (
          <Checkout
            onSubmit={handlePaymentVerify}
            paymentAmount={paymentAmount}
            currencyType={currencyType}
          />
        )}
      </div>
    </div>
  )
}

export default PostProject
