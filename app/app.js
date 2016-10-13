import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'

import store from './store'
import Start from './routes/Start'
import DeviceDetails from './routes/DeviceDetails'

require('./style.less')

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Start} />
      <Route path="/devices/:deviceId" component={DeviceDetails} />
    </Router>
  </Provider>,
  document.getElementById('content')
)
