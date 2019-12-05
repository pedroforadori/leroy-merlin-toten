import moment from 'moment'

import { oauthApi } from './api'

const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env

const form = {
  grant_type: 'client_credentials',
  client_id: REACT_APP_CLIENT_ID,
  client_secret: REACT_APP_CLIENT_SECRET
}

export const LOCAL_KEY = '@leroy-kiosk'

export const ACCESS_TOKEN = '@leroy-kiosk/token'

export const EXPIRES_AT = '@leroy-kiosk/expires_at'

export const EDIT_SETUP = '@leroy-kiosk/setup'

export const getLocalObj = key => JSON.parse(localStorage.getItem(key)) || {}

export const getToken = () => localStorage.getItem(ACCESS_TOKEN)

export const setToken = value => localStorage.setItem(ACCESS_TOKEN, value)

export const getTokenExpirationDate = () => localStorage.getItem(EXPIRES_AT)

export const setTokenExpirationDate = value => localStorage.setItem(EXPIRES_AT, value)

export const getEditSetup = () => localStorage.getItem(EDIT_SETUP)

export const setEditSetup = value => localStorage.setItem(EDIT_SETUP, value)

export const getStoreId = () => getLocalObj(LOCAL_KEY).storeId

export const getStoreName = () => getLocalObj(LOCAL_KEY).storeName

export const getDepartmentName = () => getLocalObj(LOCAL_KEY).departmentName

export const getBanner1Title = () => getLocalObj(LOCAL_KEY).banner1Title

export const getBanner1Subtitle = () => getLocalObj(LOCAL_KEY).banner1Subtitle

export const getBanner2Title = () => getLocalObj(LOCAL_KEY).banner2Title

export const getBanner2Subtitle = () => getLocalObj(LOCAL_KEY).banner2Subtitle

export const getSelectedCategories = () => getLocalObj(LOCAL_KEY).selectedCategories

export const isAccessTokenValid = () => moment(getTokenExpirationDate()).diff(new Date()) > 0

export const persistData = data => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data))
}

export const excludeData = () => {
  localStorage.removeItem(LOCAL_KEY)
  localStorage.clear()
}

export const setAuthorization = async config => {
  const localToken = getToken()
  const isValid = isAccessTokenValid()

  if (localToken && isValid) {
    config.headers.Authorization = `Bearer ${localToken}`
  } else {
    const response = await oauthApi.post('', form)

    const { access_token, expires_in } = response.data

    const now = new Date()
    const expirationDate = new Date(now.getTime() + expires_in * 1000)

    setToken(access_token)
    setTokenExpirationDate(expirationDate)

    config.headers.Authorization = `Bearer ${access_token}`
  }

  return config
}
