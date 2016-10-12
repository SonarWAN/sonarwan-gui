import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Welcome from './components/Welcome'

ReactDOM.render(
  <Provider store={store}>
    <Welcome />
  </Provider>,
  document.getElementById('content')
)
