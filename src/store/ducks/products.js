export const Types = {
  GET_CATEGORIES_REQUEST: 'products/GET_CATEGORIES_REQUEST',
  GET_CATEGORIES_SUCCESS: 'products/GET_CATEGORIES_SUCCESS',
  GET_PRODUCTS_REQUEST: 'products/GET_PRODUCTS_REQUEST',
  GET_PRODUCTS_SUCCESS: 'products/GET_PRODUCTS_SUCCESS',
  GET_PRODUCT_DETAILS_REQUEST: 'products/GET_PRODUCT_DETAILS_REQUEST',
  GET_PRODUCT_DETAILS_SUCCESS: 'products/GET_PRODUCT_DETAILS_SUCCESS'
}

const INITIAL_STATE = {
  categories: [],
  products: [],
  productDetails: {},
  loading: true
}

export default function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_CATEGORIES_REQUEST:
      return { ...state, loading: true }
    case Types.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.data
      }
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
  getCategoriesRequest: () => ({
    type: Types.GET_CATEGORIES_REQUEST
  }),
  getCategoriesSuccess: data => ({
    type: Types.GET_CATEGORIES_SUCCESS,
    data
  }),
  getProductsRequest: categoryId => ({
    type: Types.GET_PRODUCTS_REQUEST,
    categoryId
  }),
  getProductsSuccess: data => ({
    type: Types.GET_PRODUCTS_SUCCESS,
    data
  }),
  getProductDetailsRequest: productId => ({
    type: Types.GET_PRODUCT_DETAILS_REQUEST,
    productId
  }),
  getProductDetailsSuccess: data => ({
    type: Types.GET_PRODUCT_DETAILS_SUCCESS,
    data
  })
}
