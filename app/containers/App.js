import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import Loader from '../components/Loader'
import Navbar from '../components/Navbar'

class App extends React.Component {
  render() {
    if (this.props.loading) {
      return (
        <div>
          <Loader />
        </div>
      )
    }

    return (
      <div className="app">
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { loading: state.loading }
}

export default connect(mapStateToProps)(App)
