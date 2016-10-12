import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Start from './components/Start'

require('./style.less')

ReactDOM.render(
  <Provider store={store}>
    <Start />
  </Provider>,
  document.getElementById('content')
)
