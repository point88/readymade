import { useEffect } from 'react'
import { toast } from 'react-toast'
import { useParams, useNavigate } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'
import API from '../../Services/API'

const Loading = () => {
  const { token } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (token !== undefined) {
      API.get(`emailverification?token=${token}`)
        .then((result) => {
          toast.success('Email Verified Successfully!')
          navigate('/new/email-verified')
        })
        .catch((err) => {
          toast.error('Email Verification Fail!')
          console.error(err.request.response)
        })
    }
  }, [token, navigate])

  return (
    <div>
      <Backdrop
        sx={{ color: '#ffffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <div className="m-auto flex justify-center flex-col items-center gap-y-[20px]">
          <CircularProgress color="inherit" />
          <h1 className="font-[Poppins] text-[20px] text-center">
            Loading....
          </h1>
        </div>
      </Backdrop>
    </div>
  )
}

export default Loading
