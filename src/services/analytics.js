import ReactGA from 'react-ga'

const { REACT_APP_TRACKING_CODE } = process.env

export let ga = null

export const initializeReactGA = () => {
  ReactGA.initialize(REACT_APP_TRACKING_CODE, { debug: true })

  ga = ReactGA
}
