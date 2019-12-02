import { all, takeLatest } from 'redux-saga/effects'

import { Types as ProductsTypes } from '../ducks/products'

import {
  getStores,
  getCategories,
  getCategoriesById,
  getProducts,
  getProductDetails,
  sendLog
} from './products'

export default function* rootSaga() {
  yield all([
    takeLatest(ProductsTypes.GET_STORES_REQUEST, getStores),
    takeLatest(ProductsTypes.GET_CATEGORIES_REQUEST, getCategories),
    takeLatest(ProductsTypes.GET_CATEGORIES_BY_ID_REQUEST, getCategoriesById),
    takeLatest(ProductsTypes.GET_PRODUCTS_REQUEST, getProducts),
    takeLatest(ProductsTypes.GET_PRODUCT_DETAILS_REQUEST, getProductDetails),
    takeLatest(ProductsTypes.POST_LOG_REQUEST, sendLog)
  ])
}
