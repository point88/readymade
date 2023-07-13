import { useState, useRef, useEffect, useMemo } from 'react'
import { toast } from 'react-toast'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import LogoEn from '../../../Assests/Images/logo_en.png'
import LeftBitIcon_Green from '../../../Assests/Images/leftbit_green.png'
import { useNavigate } from 'react-router-dom'
import AddPhotoIcon from '../../../Assests/Images/add_photo.png'
import i18n from '../../../i18n'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const ProfileDetails = ({
  handleSave,
  accountType,
  firstName,
  setFName,
  lastName,
  setLName,
}) => {
  const navigate = useNavigate()
  const uploadRef = useRef()
  const [files, setFiles] = useState([])
  const [serverId, setServerId] = useState('')
  const [imageURL, setImageUrl] = useState('')
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  const isDisabled = useMemo(() => !serverId, [serverId])
  useEffect(() => {
    if (accountType === 1) {
      setFName(firstName + ' ' + lastName)
    }
  }, [accountType])

  useEffect(() => {
    if (files.length) {
      setImageUrl(URL.createObjectURL(files[0]?.file))
    }
  }, [files, setImageUrl])

  const handleNext = () => {
    if (
      (accountType === 1 && firstName === '') ||
      (accountType !== 1 && (firstName === '' || lastName === ''))
    ) {
      toast.warn('Please fill all fields.')
      return
    }

    const filepond = files.map((e) => e.serverId)
    if (!filepond.length || !filepond[0]) return
    handleSave(
      accountType === 1
        ? { company_name: firstName, filepond }
        : {
            first_name: firstName,
            last_name: lastName,
            filepond,
          },
    )
  }

  const handleAttach = () => {
    uploadRef.current.browse()
  }

  return (
    <div
      className={`w-full lg:w-[52%] h-full flex justify-start lg:justify-center items-center flex-col mt-[343px] lg:mt-0 ${
        lng ? 'font-[poppins]' : 'font-[almarai]'
      }`}
    >
      <div className="w-[90%] sm:w-[470px] bg-white filter px-[35px] pt-[28px] pb-[20px] relative">
        <div className="absolute text-[19px] leading-[31px] text-[#07122f] font-bold top-[-40px] w-full">
          {t('profiledetail')}
        </div>
        <div dir="ltr" className="flex w-full justify-between items-end">
          <img
            src={LeftBitIcon_Green}
            alt="previous"
            className="w-[10px] h-[18px] cursor-pointer mb-[8px]"
            onClick={() => navigate(-1)}
          />
          <img src={LogoEn} alt="Logo" className="w-[176px] h-[57px]" />
          <img
            src={LeftBitIcon_Green}
            alt="previous"
            className="opacity-0 w-[10px] h-[18px]"
          />
        </div>
        <label>
          <div
            className="w-[153px] h-[153px] mx-auto border-solid border-[1px] border-[#d5d2d2] rounded-[50px] mt-[30px] flex justify-center items-center cursor-pointer"
            onClick={handleAttach}
          >
            {imageURL ? (
              <img
                src={imageURL}
                alt="useravatar"
                className="w-full h-full rounded-[50px]"
              />
            ) : (
              <img src={AddPhotoIcon} alt="addphoto" />
            )}
          </div>
        </label>
        <FilePond
          ref={uploadRef}
          files={files}
          onprocessfile={(e, f) =>
            setServerId(!!f?.serverId ? f?.serverId : '')
          }
          onupdatefiles={setFiles}
          server={process.env.REACT_APP_BASE_URL + '/fp/process/'}
          labelIdle=""
          stylePanelAspectRatio={''}
          credits={{ label: '', url: '' }}
          className="hidden"
        />

        <h1 className="mb:text-[19px] leading-[31px] text-[#07122f] font-bold mt-[28px] mb:w-[300px] w-[90%]">
          {t('profiledetail')}
        </h1>
        <h3 className="text-[12px] leading-[18px] text-[#312f2f] mt-[12px] mb:w-[300px] w-[90%] h-[62px]">
          {t('profiledetail')}
        </h3>
        <h1 className="text-[14px] leading-[13px] text-[#312f2f] font-[500] mt-[13px] mb:w-[300px] w-[90%]">
          {accountType === 1 ? t('companyname') : t('firstname')}
        </h1>
        <input
          value={firstName}
          onChange={(e) => {
            setFName(e.target.value)
          }}
          className="border-none focus:outline-none mt-[11px] bg-[#7c957f] bg-opacity-5 mb:w-[300px] w-[90%] h-[53px] py-[19px] px-[16px] text-[10px] mb:text-[14px] text-[#b1bbc6] leading-[21px]"
          type="text"
          placeholder={
            accountType === 1
              ? t('companynameplaceholder')
              : t('firstnameplaceholder')
          }
        />
        {accountType !== 1 && (
          <>
            <h1 className="text-[14px] leading-[13px] text-[#312f2f] font-[500] mt-[21px] mb:w-[300px] w-[90%]">
              {t('lastname')}
            </h1>
            <input
              value={lastName}
              onChange={(e) => {
                setLName(e.target.value)
              }}
              className="border-none focus:outline-none mt-[11px] bg-[#7c957f] bg-opacity-5 mb:w-[300px] w-[90%] h-[53px] py-[19px] px-[16px] text-[10px] mb:text-[14px] text-[#b1bbc6] leading-[21px]"
              type="text"
              placeholder={t('lastnameplaceholder')}
            />
          </>
        )}
        <div
          dir="ltr"
          className="w-full flex justify-between mt-[50px] mb:mt-[95px]"
        >
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
            } normal-case w-[90px] mb:w-[110px] h-[40px] bg-[#009800] flex justify-center items-center cursor-pointer text-[18px] font-[500] leading-[21px] text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-50`}
            onClick={handleNext}
            disabled={isDisabled}
          >
            {t('nextbutton')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetails
