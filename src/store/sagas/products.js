import { retry, put } from 'redux-saga/effects'
import querystring from 'qs'

import { storesApi, productsApi } from '../../services/api'

import { Creators as ProductActions } from '../ducks/products'

import { getSelectedCategories } from '../../services/auth'

export function* getStores() {
  try {
    const response = yield retry(10, 2000, storesApi.get)

    yield put(ProductActions.getStoresSuccess(response.data))
  } catch (err) {
    console.log(err)
  }
}

export function* getCategories() {
  try {
    const response = yield retry(10, 2000, productsApi.post, '/categories')

    let categories = response.data.data

    const categoriesSelected = getSelectedCategories() && getSelectedCategories().split(',')

    if (categoriesSelected) {
      categories = categories.map(category =>
        categoriesSelected.includes(category._id) ? { ...category, isSelected: true } : category
      )
    }

    yield put(ProductActions.getCategoriesSuccess(categories))
  } catch (err) {
    console.log(err)
  }
}

export function* getCategoriesById(action) {
  try {
    const response = yield retry(10, 2000, productsApi.post, '/categories', action.payload)

    yield put(ProductActions.getCategoriesByIdSuccess(response.data.data))
  } catch (err) {
    console.log(err)
  }
}

export function* getProducts(action) {
  try {
    const qs = querystring.stringify(action.payload, { addQueryPrefix: true, skipNulls: true })

    const responseProducts = yield retry(10, 2000, productsApi.get, `/products${qs}`)

    const responseCategory = yield retry(10, 2000, productsApi.post, '/categories', {
      ids: [action.payload.categories]
    })

    const { brands = [], colors = [] } =
      responseCategory.data.data.length && responseCategory.data.data[0]

    yield put(ProductActions.getProductsSuccess(responseProducts.data.data, brands, colors))
  } catch (err) {
    console.log(err)
  }
}

export function* getProductDetails(action) {
  try {
    const payload = {
      store_id: action.storeId
    }

    const qs = querystring.stringify(payload, { addQueryPrefix: true })

    const response = yield retry(10, 2000, productsApi.get, `/products/${action.productId}${qs}`)

    yield put(ProductActions.getProductDetailsSuccess(response.data))
  } catch (err) {
    console.log(err)
  }
}

export function* sendLog(action) {
  try {
    const response = yield retry(10, 5000, productsApi.post, '/log', action.payload)

    yield put(ProductActions.sendLogSuccess(response.data))
  } catch (err) {
    console.log(err)
  }
}
