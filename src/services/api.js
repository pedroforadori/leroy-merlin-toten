import axios from 'axios'

// import { setAuthorization } from './auth'

const {
  // NODE_ENV,
  REACT_APP_DEV_BASEURL,
  REACT_APP_PRODUCTS_API
} = process.env

// const isProd = NODE_ENV === 'production'
const isProd = false // TODO REFACTOR WHEN API IS READY

export const productsApi = axios.create({
  baseURL: isProd ? REACT_APP_PRODUCTS_API : REACT_APP_DEV_BASEURL
})

// productsApi.interceptors.request.use(async config => setAuthorization(config))
