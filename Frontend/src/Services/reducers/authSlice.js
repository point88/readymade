import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'athedAs',
  initialState: {
    userType: null,
    email: null,
    password: null,

    userInfo: {},
    userContact: {},
    userSkills: [],
    userEducation: [],
    userExperience: [],
    userQualification: [],
    userPublication: [],
    userLanguage: []

  },
  reducers: {
    setAuthedAs(state, action) {
      state.userType = action.payload.userType
      state.email = action.payload.email
      state.password = action.payload.password
    },
    setAuthedUserInfo(state, action) {
      state.userInfo = action.payload.userInfo
    },
    setUserContact(state, action) {
      state.userContact = action.payload.userContact
    },
    setUserSkills(state, action) {
      state.userSkills = action.payload.userSkills
    },
    setUserEducation(state, action) {
      state.userEducation = action.payload.userEducation
    },
    setUserExperience(state, action) {
      state.userExperience = action.payload.userExperience
    },
    setUserQualification(state, action) {
      state.userQualification = action.payload.userQualification
    },
    setUserPublication(state, action) {
      state.userPublication = action.payload.userPublication
    },
    setUserLanguage(state, action) {
      state.userLanguage = action.payload.userLanguage
    }
  },
})

export const { setAuthedAs, setAuthedUserInfo, setUserContact, setUserSkills, setUserEducation, setUserExperience, setUserQualification, setUserPublication, setUserLanguage } = authSlice.actions

export default authSlice.reducer
