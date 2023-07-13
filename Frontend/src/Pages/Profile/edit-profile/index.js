import FreelancerEditProfile from './freelancer'
import CustomerEditProfile from './customer'
import AuthService from '../../../Services/auth'
import { USER_TYPE } from '../../../Services/constants/accountType'

const EditProfile = () => {
  const userInfo = AuthService.getUser()
  const userType = AuthService.getUserType()
  return (
    <div className="py-5 xl:py-12 sm:py-10 bg-white">
      {userType === USER_TYPE.Freelancer ? (
        <FreelancerEditProfile user={userInfo} />
      ) : (
        <CustomerEditProfile />
      )}
    </div>
  )
}

export default EditProfile
