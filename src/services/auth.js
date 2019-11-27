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

export const getLocalObj = key => JSON.parse(localStorage.getItem(key)) || {}

export const getToken = () => localStorage.getItem(ACCESS_TOKEN)

export const setToken = value => localStorage.setItem(ACCESS_TOKEN, value)

export const getTokenExpirationDate = () => getLocalObj(LOCAL_KEY).accessTokenExpiresAt

export const getRefreshToken = () => getLocalObj(LOCAL_KEY).refresh_token

export const getRefreshTokenExpirationDate = () => getLocalObj(LOCAL_KEY).refreshTokenExpiresAt

export const getStoreId = () => getLocalObj(LOCAL_KEY).storeId

// export const getDepartmentId = () => getLocalObj(LOCAL_KEY).departmentId

export const getSelectedCategories = () => getLocalObj(LOCAL_KEY).selectedCategories

export const isAccessTokenValid = () => moment(getTokenExpirationDate()).diff(new Date()) > 0

export const isRefreshTokenValid = () =>
  moment(getRefreshTokenExpirationDate()).diff(new Date()) > 0

export const persistData = data => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data))
}

export const excludeData = () => {
  localStorage.removeItem(LOCAL_KEY)
  localStorage.clear()
}

export const setAuthorization = async config => {
  let localToken = getToken()

  // console.log('token localStorage', !!localToken)

  if (localToken) {
    config.headers.Authorization = `Bearer ${localToken}`
  } else {
    const response = await oauthApi.post('', form)

    const token = response.data.access_token

    // console.log('token response', token)

    config.headers.Authorization = `Bearer ${token}`

    setToken(token)
  }

  return config
}
