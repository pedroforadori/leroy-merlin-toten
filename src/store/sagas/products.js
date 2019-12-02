import { retry, put } from 'redux-saga/effects'
import querystring from 'qs'

import { storesApi, productsApi } from '../../services/api'

import { Creators as ProductActions } from '../ducks/products'

import { getSelectedCategories } from '../../services/auth'

// import stores from '../../mock/stores'
// import categories from '../../mock/categories'
// import departments from '../../mock/departments'

export function* getStores() {
  try {
    const response = yield retry(10, 2000, storesApi.get)

    yield put(ProductActions.getStoresSuccess(response.data))
  } catch (err) {
    console.log(err)
  }
}

// export function* getDepartments(action) {
//   try {
//     // const response = yield retry(10, 5000, productsApi.get, `/departments/${action.storeId}`)

//     let response = { data: '' }

//     yield put(
//       ProductActions.getDepartmentsSuccess(
//         response.data ||
//           departments
//             .filter(department => department.storeId === action.storeId)
//             .map(department => ({
//               ...department,
//               label: department.name,
//               value: department.name
//             }))
//       )
//     )
//   } catch (err) {
//     console.log(err)
//   }
// }

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

    // let response = { data: '' }

    // let categoriesMock = categories.filter(
    //   category => category.departmentId === action.departmentId
    // )

    // let filteredCategories

    // if (action.selectedCategories) {
    //   const selectedCategories = getSelectedCategories()

    //   filteredCategories = response.data.data.filter(category =>
    //     selectedCategories.find(selectedCategory => selectedCategory.id === category._id)
    //   )
    // }

    // yield put(ProductActions.getCategoriesSuccess(filteredCategories || response.data.data))
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
    const payload = {
      store_id: action.storeId,
      categories: action.categoryId
    }

    const qs = querystring.stringify(payload, { addQueryPrefix: true })

    const response = yield retry(10, 2000, productsApi.get, `/products${qs}`)

    yield put(ProductActions.getProductsSuccess(response.data.data))
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
