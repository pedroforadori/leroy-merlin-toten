import axios from 'axios'

import { setAuthorization } from './auth'

const {
  REACT_APP_OAUTH_API,
  REACT_APP_STORES_API,
  REACT_APP_CATEGORIES_API,
  REACT_APP_PRODUCTS_API
} = process.env

export const oauthApi = axios.create({
  baseURL: REACT_APP_OAUTH_API
})

export const storesApi = axios.create({
  baseURL: REACT_APP_STORES_API
})

export const categoriesApi = axios.create({
  baseURL: REACT_APP_CATEGORIES_API
})

export const productsApi = axios.create({
  baseURL: REACT_APP_PRODUCTS_API
})

storesApi.interceptors.request.use(async config => setAuthorization(config))
categoriesApi.interceptors.request.use(async config => setAuthorization(config))
productsApi.interceptors.request.use(async config => setAuthorization(config))
