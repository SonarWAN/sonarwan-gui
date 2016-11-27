import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default connect()(App)
