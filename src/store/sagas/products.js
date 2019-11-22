import { retry, put } from 'redux-saga/effects'
import { productsApi } from '../../services/api'

import { Creators as ProductActions } from '../ducks/products'

import categories from '../../mock/categories'

export function* getCategories() {
  try {
    // const response = yield retry(10, 5000, productsApi.get, `/categories`)

    let response = { data: '' }

    yield put(ProductActions.getCategoriesSuccess(response.data || categories))
  } catch (err) {
    console.log(err)
  }
}

export function* getProducts(action) {
  try {
    const response = yield retry(10, 5000, productsApi.get, `/categories/${action.categoryId}`)

    yield put(ProductActions.getProductsSuccess(response.data))
  } catch (err) {
    console.log(err)
  }
}

export function* getProductDetails(action) {
  try {
    const response = yield retry(10, 5000, productsApi.get, `/product/${action.productId}`)

    yield put(ProductActions.getProductDetailsSuccess(response.data))
  } catch (err) {
    console.log(err)
  }
}
