import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'

import store from './store'
import Start from './components/Start'

require('./style.less')

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Start} />
    </Router>
  </Provider>,
  document.getElementById('content')
)
