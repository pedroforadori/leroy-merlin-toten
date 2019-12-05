import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './styles/global.css'
import * as serviceWorker from './serviceWorker'
import './config/reactotron'
import store from './store'
import App from './App'
// import { initializeReactGA } from './services/analytics'

// initializeReactGA()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.register()
