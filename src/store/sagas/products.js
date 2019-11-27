import { retry, put } from 'redux-saga/effects'
import { storesApi, categoriesApi, productsApi } from '../../services/api'

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

export function* getCategories(action) {
  try {
    const response = yield retry(10, 2000, categoriesApi.get)

    // let response = { data: '' }

    // let categoriesMock = categories.filter(
    //   category => category.departmentId === action.departmentId
    // )

    let filteredCategories

    if (action.filterSelected) {
      const selectedCategories = getSelectedCategories()

      filteredCategories = response.data.data.filter(category =>
        selectedCategories.find(selectedCategory => selectedCategory.id === category._id)
      )
    }

    yield put(ProductActions.getCategoriesSuccess(filteredCategories || response.data.data))
  } catch (err) {
    console.log(err)
  }
}

export function* getProducts(action) {
  try {
    const response = yield retry(
      10,
      2000,
      productsApi.get,
      '/'
      // {
      //   headers: {
      //     Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM0MmQ5NjllNmJiMWE1OTIyZTVkMjhiNWExOGNiOWRhZWJiOWM2YjQzNGM0OWMyNWNkYjI2MGZhZDkwZjk5MjRkYzAxYjI0NjI3NGE0NzA4In0.eyJhdWQiOiI1ZGM1YzNiZGQ0ZjhhYzIwZTYxZTZhYjIiLCJqdGkiOiIzNDJkOTY5ZTZiYjFhNTkyMmU1ZDI4YjVhMThjYjlkYWViYjljNmI0MzRjNDljMjVjZGIyNjBmYWQ5MGY5OTI0ZGMwMWIyNDYyNzRhNDcwOCIsImlhdCI6MTU3NDY4Mjg2NSwibmJmIjoxNTc0NjgyODY1LCJleHAiOjE1NzU5Nzg4NjUsInN1YiI6IiIsInNjb3BlcyI6WyJyZWFkLnByb2R1Y3RzIl19.zY6oqiuHwNc2qzNtHYmqNIxSw7JcaI0uCRb6AAMcn8OfN34sZpX_UIRde2e0qLQIATqWsKHTy0winWyFLenzoiuz-oAs1uIHu2y3C6oBJ9lzd9chOcOfBtQW_VjA2BGzQPJstJsjZZpsKpHDJYpyON3dfe92poJvkvcOMnrPBSQxCFrroWZrGBeLzHGQIF2sKYi8NAkZoFy7cmKQmDTOgHBR7QDF-kOb2-HCw6skcM2aIt_jBzYEnxFjiEFwIp7W62MMib8UYcQ8gE2ChnYASbtzMUvY5p8E-f7fWKDoG6EzTw_CoL9ZyZ0cErV2Cr57w9Eo6Dg7bZFeZ9CY01SYl9cN9oJKhzTAFI-UjzgKbO16gRD8UiUp2jBhcmk4OMF0N2LeXnjywQ3_IiJMlLQJULibNSnC6qaIbLbxvuBE0MNKYPvcDYXpkVL0-rlc7uIJacfbBzMyZR4-Xf_n1wNGS4LigAx8Y51xWR2jfa8JeQLW87sYXghdeF3kMPe3wOQLM5bvrUPXj__qtScV6EdlgLBSHgjChOgZE965aWV0aYQdLzN4NOCyHOf7gugFXRzjBJqzHRb-kk5T33EyNOWmWAw9kK7fTd5GzdyIbHc-f9NP2MGvLq5Wf9OSJtGDQFJ0XDHHXs3Vyy9pD99REftwx6BA2NwLiiLyZytYXs71zZo`
      //   }
      // }
    )

    yield put(ProductActions.getProductsSuccess(response.data))
  } catch (err) {
    console.log(err)
  }
}

export function* getProductDetails(action) {
  try {
    const response = yield retry(10, 5000, productsApi.get, `/${action.productId}`)

    yield put(ProductActions.getProductDetailsSuccess(response.data))
  } catch (err) {
    console.log(err)
  }
}
