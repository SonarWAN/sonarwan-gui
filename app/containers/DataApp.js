import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import Sidebar from '../components/Sidebar'

class App extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div className="app-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect()(App)
