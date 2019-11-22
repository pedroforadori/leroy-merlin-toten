import moment from 'moment'

export const LOCAL_KEY = '@leroy-kiosk'

export const getLocalObj = key => JSON.parse(localStorage.getItem(key)) || { user: {} }

export const getToken = () => getLocalObj(LOCAL_KEY).access_token

export const getTokenExpirationDate = () => getLocalObj(LOCAL_KEY).accessTokenExpiresAt

export const getRefreshToken = () => getLocalObj(LOCAL_KEY).refresh_token

export const getRefreshTokenExpirationDate = () => getLocalObj(LOCAL_KEY).refreshTokenExpiresAt

export const getUserId = () => getLocalObj(LOCAL_KEY).user.id

export const getUserName = () => getLocalObj(LOCAL_KEY).user.firstName

export const getCustomerBranchId = () => getLocalObj(LOCAL_KEY).user.customerBranchId

export const getCustomerBranchName = () => getLocalObj(LOCAL_KEY).user.customerBranchName

export const getCustomerBranchImg = () => getLocalObj(LOCAL_KEY).user.customerBranchImg

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
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}
