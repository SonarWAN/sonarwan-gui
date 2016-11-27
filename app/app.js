import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, IndexRoute, Route, hashHistory as history } from 'react-router'

import store from './store'
import App from './containers/App'
import DataApp from './containers/DataApp'
import Start from './routes/Start'
import Summary from './routes/Summary'
import DeviceDetails from './routes/DeviceDetails'
import Authorless from './routes/Authorless'

require('./listeners')

require('./style.less')

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Start} />
        <Route component={DataApp}>
          <Route path="summary" component={Summary} />
          <Route path="devices/:deviceId" component={DeviceDetails} />
          <Route path="authorless" component={Authorless} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
)
