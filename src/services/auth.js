import moment from 'moment'
import qs from 'qs'

import { oauthApi } from './api'

const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env

const form = {
  grant_type: 'client_credentials',
  client_id: REACT_APP_CLIENT_ID,
  client_secret: REACT_APP_CLIENT_SECRET,
  scope: 'read.products'
}

export const LOCAL_KEY = '@leroy-kiosk'

export const getLocalObj = key => JSON.parse(localStorage.getItem(key)) || {}

export const getToken = () => getLocalObj(LOCAL_KEY).access_token

export const getTokenExpirationDate = () => getLocalObj(LOCAL_KEY).accessTokenExpiresAt

export const getRefreshToken = () => getLocalObj(LOCAL_KEY).refresh_token

export const getRefreshTokenExpirationDate = () => getLocalObj(LOCAL_KEY).refreshTokenExpiresAt

export const getStoreId = () => getLocalObj(LOCAL_KEY).storeId

export const getDepartmentId = () => getLocalObj(LOCAL_KEY).departmentId

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
  let token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    const query = qs.stringify(form, { addQueryPrefix: true })

    token = await oauthApi.post('/', query).data.access_token

    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}
