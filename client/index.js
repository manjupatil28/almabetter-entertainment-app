import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'

import App from './App'
import './styles/main.scss'
//Make the store available to the app
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
