import React from 'react'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { LinkedInCallback } from 'react-linkedin-login-oauth2'
import { Header, Footer } from '../Layouts'
// import EmailVerification from '../Pages/Authentication/EmailVerification'
// import PaymentVerify from '../Pages/Authentication/PaymentVerify'
import LandingPage from '../Pages/Landing'
import { SignUp, SignIn } from '../Pages/Authentication'
import EmailVerified from '../Pages/Authentication/EmailVerified'
import ChangeEmail from '../Pages/Authentication/ChangeEmail'
import LinkedAccount from '../Pages/Authentication/LinkedAccount'
import SelectSkill from '../Pages/Authentication/SelectSkill'
import Paymentdetail from '../Pages/Authentication/SignUp/paymentdetail'
import PaymentVerify from '../Pages/Authentication/SignUp/paymentverification'
import ProfileDetail from '../Pages/Authentication/ProfileDetail'
import PasswordVerification from '../Pages/Authentication/PasswordVerification'
import ForgetPassword from '../Pages/Authentication/ForgetPassword'
import PostProject from '../Pages/Post'
import ResetPasswordForm from '../Pages/Authentication/PasswordVerification/resetpassword'
import SubscriptionPage from '../Pages/Subscription'
// import SubscriptionPage from '../Pages/Subscription'
import SignLayout from '../Components/Layout/SignLayout'
import Loading from '../Components/Loading'
import AuthService from '../Services/auth'

import FreelancerEditProfile from '../Pages/Profile/edit-profile/freelancer'

import EditProfile from '../Pages/Profile/edit-profile'


const Layout = ({ hideHeaderPaths = [] }) => {
  const { pathname } = useLocation()

  return (
    <>
      {!hideHeaderPaths.includes(pathname) &&
        !pathname.includes('/new') &&
        !pathname.includes('/verifyreset') && <Header />}
      <Outlet />
      {!hideHeaderPaths.includes(pathname) &&
        !pathname.includes('/new') &&
        !pathname.includes('/verifyreset') && 
        !pathname.includes('/edit-profile') && 
        <Footer />}
    </>
  )
}

export default function RouteGroup() {
  return (
    <Routes>
      <Route
        element={
          <Layout
            hideHeaderPaths={[
              '/signup',
              '/signin',
              '/forgotpassword',
              '/reset-password',
            ]}
          />
        }
      >
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route exact path="/linkedin" element={<LinkedInCallback />} />
        <Route path="/new/linked-accounts" element={<LinkedAccount />} />
        <Route path="/new/profile-details" element={<ProfileDetail />} />
        <Route path='/subscription' element={<SubscriptionPage />} />
        {/* <Route path="/subscription" element={<SubscriptionPage />} /> */}
        <Route
          path="/new/skills"
          element={
            <SignLayout>
              <SelectSkill />
            </SignLayout>
          }
        />
        <Route
          path="/new/email-verified/:key"
          // path="/new/email-verified"
          element={
            <SignLayout>
              <EmailVerified />
            </SignLayout>
          }
        />
        <Route
          path="/new/payment-verify"
          element={
            <SignLayout>
              <PaymentVerify />
            </SignLayout>
          }
        />
        <Route
          path="/new/payment-detail"
          element={
            <SignLayout>
              <Paymentdetail />
            </SignLayout>
          }
        />
        {/* <Route path="/new/email-verification" element={<EmailVerification />} /> */}
        <Route path="/new/email-verify" element={<ChangeEmail />} />
        <Route path="/new/verify/:token" element={<Loading />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
        <Route path="/verifyreset/:email" element={<PasswordVerification />} />
        <Route
          path="/reset-password"
          element={
            <SignLayout>
              <ResetPasswordForm />
            </SignLayout>
          }
        />
        {/* <Route path="/edit-profile/freelancer" element={<FreelancerEditProfile />} />  */}
        <Route exact path="/" element={<PrivateRouteForClient />}>
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/post-project" element={<PostProject />} />
        </Route>
        {/* <Route exact path='/' element={<Navigate to='/home' replace />} /> */}        
      </Route>
      
    </Routes>
  )
}

function PrivateRouteForClient() {
  const isAuthed = AuthService.isSigned()
  // const userInfo = AuthService.getUser()
  return isAuthed ? (
    <>
      <div className="mt-[69px] mb:mt-[69px] sm:mt-[100px] xl:mt-[142px]">
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to={'/signin'} />
  )
}
