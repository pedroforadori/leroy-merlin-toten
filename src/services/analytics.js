import ReactGA from 'react-ga'

const { REACT_APP_TRACKING_CODE } = process.env

export let ga = null

export const initializeReactGA = (storeId, storeName, departmentName) => {
  ReactGA.initialize(REACT_APP_TRACKING_CODE, {
    debug: true
    // gaOptions: {
    //   storeId,
    //   storeName,
    //   departmentName
    // }
  })

  ga = ReactGA
}
