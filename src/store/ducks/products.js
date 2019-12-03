export const Types = {
  GET_STORES_REQUEST: 'products/GET_STORES_REQUEST',
  GET_STORES_SUCCESS: 'products/GET_STORES_SUCCESS',
  SET_STORE_ID: 'products/SET_STORE_ID',
  GET_DEPARTMENTS_REQUEST: 'products/GET_DEPARTMENTS_REQUEST',
  GET_DEPARTMENTS_SUCCESS: 'products/GET_DEPARTMENTS_SUCCESS',
  GET_CATEGORIES_REQUEST: 'products/GET_CATEGORIES_REQUEST',
  GET_CATEGORIES_SUCCESS: 'products/GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_BY_ID_REQUEST: 'products/GET_CATEGORIES_BY_ID_REQUEST',
  GET_CATEGORIES_BY_ID_SUCCESS: 'products/GET_CATEGORIES_BY_ID_SUCCESS',
  SET_CATEGORIES: 'products/SET_CATEGORIES',
  SET_BRAND: 'products/SET_BRAND',
  SET_COLOR: 'products/SET_COLOR',
  GET_PRODUCTS_REQUEST: 'products/GET_PRODUCTS_REQUEST',
  GET_PRODUCTS_SUCCESS: 'products/GET_PRODUCTS_SUCCESS',
  GET_PRODUCT_DETAILS_REQUEST: 'products/GET_PRODUCT_DETAILS_REQUEST',
  GET_PRODUCT_DETAILS_SUCCESS: 'products/GET_PRODUCT_DETAILS_SUCCESS',
  POST_LOG_REQUEST: 'products/POST_LOG_REQUEST',
  POST_LOG_SUCCESS: 'products/POST_LOG_SUCCESS'
}

const INITIAL_STATE = {
  storeId: null,
  departmentName: '',
  banner1Title: 'Veja aqui',
  banner1Subtitle: 'Todas as opções de decoração',
  banner2Title: 'Renove sua Casa',
  banner2Subtitle: 'Com os melhores descontos e as melhores marcas',
  stores: [],
  categories: [],
  categoriesSelected: [],
  brands: [],
  colors: [],
  brandObj: null,
  colorObj: null,
  products: [],
  productDetails: {},
  loading: false,
  loadingCategories: false,
  logPayload: {},
  logResponse: {}
}

export default function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_STORES_REQUEST:
      return { ...state, loading: true }
    case Types.GET_STORES_SUCCESS:
      return { ...state, loading: false, stores: action.data }
    case Types.SET_STORE_ID:
      return { ...state, storeId: action.storeId }
    case Types.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loadingCategories: true,
        categories: [],
        categoriesSelected: [],
        brands: [],
        colors: []
      }
    case Types.GET_CATEGORIES_SUCCESS:
      return { ...state, loadingCategories: false, categories: action.data }
    case Types.GET_CATEGORIES_BY_ID_REQUEST:
      return {
        ...state,
        loadingCategories: true,
        categories: [],
        categoriesSelected: [],
        brands: [],
        colors: [],
        brandObj: null,
        colorObj: null
      }
    case Types.GET_CATEGORIES_BY_ID_SUCCESS:
      return { ...state, loadingCategories: false, categories: [], categoriesSelected: action.data }
    case Types.SET_CATEGORIES:
      return { ...state, categories: action.categories }
    case Types.SET_BRAND:
      return { ...state, brandObj: action.brandObj }
    case Types.SET_COLOR:
      return { ...state, colorObj: action.colorObj }
    case Types.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
        productDetails: {}
      }
    case Types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.data,
        brands: action.brands,
        colors: action.colors
      }
    case Types.GET_PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true, productDetails: {} }
    case Types.GET_PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, productDetails: action.data }
    case Types.POST_LOG_REQUEST:
      return { ...state, logPayload: action.payload }
    case Types.POST_LOG_SUCCESS:
      return { ...state, logResponse: action.response }
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

  getCategoriesRequest: () => ({
    type: Types.GET_CATEGORIES_REQUEST
  }),
  getCategoriesSuccess: data => ({
    type: Types.GET_CATEGORIES_SUCCESS,
    data
  }),

  getCategoriesByIdRequest: payload => ({
    type: Types.GET_CATEGORIES_BY_ID_REQUEST,
    payload
  }),
  getCategoriesByIdSuccess: data => ({
    type: Types.GET_CATEGORIES_BY_ID_SUCCESS,
    data
  }),

  setCategories: categories => ({
    type: Types.SET_CATEGORIES,
    categories
  }),
  setBrand: brandObj => ({
    type: Types.SET_BRAND,
    brandObj
  }),
  setColor: colorObj => ({
    type: Types.SET_COLOR,
    colorObj
  }),

  getProductsRequest: payload => ({
    type: Types.GET_PRODUCTS_REQUEST,
    payload
  }),
  getProductsSuccess: (data, brands, colors) => ({
    type: Types.GET_PRODUCTS_SUCCESS,
    data,
    brands,
    colors
  }),

  getProductDetailsRequest: (storeId, productId) => ({
    type: Types.GET_PRODUCT_DETAILS_REQUEST,
    storeId,
    productId
  }),
  getProductDetailsSuccess: data => ({
    type: Types.GET_PRODUCT_DETAILS_SUCCESS,
    data
  }),

  sendLogRequest: payload => ({
    type: Types.POST_LOG_REQUEST,
    payload
  }),
  sendLogSuccess: response => ({
    type: Types.POST_LOG_SUCCESS,
    response
  })
}
