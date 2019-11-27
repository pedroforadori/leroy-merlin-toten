export const Types = {
  GET_STORES_REQUEST: 'products/GET_STORES_REQUEST',
  GET_STORES_SUCCESS: 'products/GET_STORES_SUCCESS',
  SET_STORE_ID: 'products/SET_STORE_ID',
  GET_DEPARTMENTS_REQUEST: 'products/GET_DEPARTMENTS_REQUEST',
  GET_DEPARTMENTS_SUCCESS: 'products/GET_DEPARTMENTS_SUCCESS',
  GET_CATEGORIES_REQUEST: 'products/GET_CATEGORIES_REQUEST',
  GET_CATEGORIES_SUCCESS: 'products/GET_CATEGORIES_SUCCESS',
  SET_CATEGORIES: 'products/SET_CATEGORIES',
  GET_PRODUCTS_REQUEST: 'products/GET_PRODUCTS_REQUEST',
  GET_PRODUCTS_SUCCESS: 'products/GET_PRODUCTS_SUCCESS',
  GET_PRODUCT_DETAILS_REQUEST: 'products/GET_PRODUCT_DETAILS_REQUEST',
  GET_PRODUCT_DETAILS_SUCCESS: 'products/GET_PRODUCT_DETAILS_SUCCESS'
}

const INITIAL_STATE = {
  storeId: null,
  // departmentId: null,
  stores: [],
  // departments: [],
  categories: [],
  categoriesSelected: [],
  products: [],
  productDetails: {},
  loading: true
}

export default function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_STORES_REQUEST:
      return { ...state, loading: true }
    case Types.GET_STORES_SUCCESS:
      return {
        ...state,
        loading: false,
        stores: action.data
      }
    case Types.SET_STORE_ID:
      return { ...state, storeId: action.storeId }
    // case Types.GET_DEPARTMENTS_REQUEST:
    //   return { ...state, loading: true, categories: [] }
    // case Types.GET_DEPARTMENTS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     departments: action.data
    //   }
    case Types.GET_CATEGORIES_REQUEST:
      return { ...state, loading: true }
    case Types.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.data
      }
    case Types.SET_CATEGORIES:
      return { ...state, categories: action.categories }
    case Types.GET_PRODUCTS_REQUEST:
      return { ...state, loading: true }
    case Types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.data
      }
    case Types.GET_PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case Types.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        productDetails: action.data
      }
    default:
      return state
  }
}

export const Creators = {
  getStoresRequest: () => ({
    type: Types.GET_STORES_REQUEST
  }),
  getStoresSuccess: data => ({
    type: Types.GET_STORES_SUCCESS,
    data
  }),
  setStoreId: storeId => ({
    type: Types.SET_STORE_ID,
    storeId
  }),
  getDepartmentsRequest: storeId => ({
    type: Types.GET_DEPARTMENTS_REQUEST,
    storeId
  }),
  getDepartmentsSuccess: data => ({
    type: Types.GET_DEPARTMENTS_SUCCESS,
    data
  }),
  getCategoriesRequest: (storeId, filterSelected) => ({
    type: Types.GET_CATEGORIES_REQUEST,
    storeId,
    filterSelected
  }),
  getCategoriesSuccess: data => ({
    type: Types.GET_CATEGORIES_SUCCESS,
    data
  }),
  setCategories: categories => ({
    type: Types.SET_CATEGORIES,
    categories
  }),
  getProductsRequest: (storeId, categoryId) => ({
    type: Types.GET_PRODUCTS_REQUEST,
    storeId,
    categoryId
  }),
  getProductsSuccess: data => ({
    type: Types.GET_PRODUCTS_SUCCESS,
    data
  }),
  getProductDetailsRequest: (storeId, productId) => ({
    type: Types.GET_PRODUCT_DETAILS_REQUEST,
    storeId,
    productId
  }),
  getProductDetailsSuccess: data => ({
    type: Types.GET_PRODUCT_DETAILS_SUCCESS,
    data
  })
}
