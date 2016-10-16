import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, IndexRoute, Route, hashHistory } from 'react-router'

import store from './store'
import App from './containers/App'
import Start from './routes/Start'
import DeviceDetails from './routes/DeviceDetails'

require('./listeners')

require('./style.less')

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Start} />
        <Route path="/devices/:deviceId" component={DeviceDetails} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
)
