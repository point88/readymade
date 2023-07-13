import axios from 'axios'
import LinkedInIcon from '../../Assests/Images/linkedin_icon.png'
import RightBitIcon_Blue from '../../Assests/Images/rightbit_blue.png'
import { CustomButton } from '../../Components/Buttons/customsocialbutton'
import { useLinkedIn } from 'react-linkedin-login-oauth2'
import i18n from '../../i18n'

export const LoginWithLinkedIn = ({ onSuccess }) => {
  const lng = i18n.language === 'en' ? true : false
  const getLinkedInUserEmailAndID = (provider, data) => {
    const params = new URLSearchParams({
      oauth2_access_token: data.access_token,
      // projection: '(id)',
    }).toString()

    return axios
      .get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://api.linkedin.com/v2/me?${params}`,
        )}`,
      )
      .then((res) => {
        console.log('linkedin resourec: ', res.data)
        return JSON.parse(res.data.contents)
      })
      .then((contents) => {
        const params = new URLSearchParams({
          q: 'members',
          projection: '(elements*(handle~))',
          oauth2_access_token: data.access_token,
        }).toString()
        return axios
          .get(
            `https://api.allorigins.win/get?url=${encodeURIComponent(
              `https://api.linkedin.com/v2/emailAddress?${params}`,
            )}`,
          )
          .then((res) => {
            const { elements } = JSON.parse(res.data.contents)
            console.log('linkedin eleemtne: ', elements)
            return {
              id: contents.id,
              firstName: contents.localizedFirstName,
              lastName: contents.localizedLastName,
              email: elements[0]['handle~'].emailAddress,
            }
          })
      })
  }

  const getLinkedInAccessToken = async (code, redirect_uri) => {
    const params = {
      code: code,
      grant_type: 'authorization_code',
      redirect_uri,
      client_id: process.env.REACT_APP_LINKEDIN_CLIENT_ID,
      client_secret: process.env.REACT_APP_LINKEIND_CLENT_SECRET,
    }
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    return await axios
      .post(
        `https://corsproxy.io/?${encodeURIComponent(
          `https://www.linkedin.com/oauth/v2/accessToken?${new URLSearchParams(
            params,
          )}`,
        )}`,
        {
          headers,
        },
      )
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleLinkedInResolve = async (data) => {
    try {
      const response = await getLinkedInAccessToken(
        data,
        process.env.REACT_APP_REDIRECT_URL + 'linkedin',
      )

      const res = await getLinkedInUserEmailAndID('linkedin', {
        access_token: response.access_token,
      })
      await onSuccess({ ...res, password: res.id })
    } catch (e) {
      console.log(e)
    }
  }

  const { linkedInLogin } = useLinkedIn({
    clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID,
    redirectUri: `${process.env.REACT_APP_REDIRECT_URL}linkedin`,
    onSuccess: handleLinkedInResolve,
    scope: 'r_liteprofile,r_emailaddress,w_member_social',
    onError: (error) => {
      console.log(error)
    },
  })

  return (
    <div
      onClick={linkedInLogin}
      className="flex h-full w-full justify-between items-center"
    >
      <img src={LinkedInIcon} className="w-[25px] h-[25px]" alt="freelancer" />
      <div className="h-full flex flex-col justify-center ml-[10px]">
        <h1 className="text-[#07122f] text-[15px] leading-[31px]">
          Continue with Linkedin
        </h1>
      </div>
      <CustomButton
        className="h-full"
        lng={lng}
        rightIcon={RightBitIcon_Blue}
      />
    </div>
  )
}
