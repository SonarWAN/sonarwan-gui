import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import Sidebar from '../components/Sidebar'
import Welcome from '../components/Welcome'
import { openFile } from '../actions'

class Start extends React.Component {
  handleOpen() {
    this.props.dispatch(openFile())
  }

  render() {
    return (
      <div className="app">
        <div className="app-body">
          <Sidebar />
          <Welcome path={this.props.path} onOpenFile={this.handleOpen.bind(this)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { path: state.path }
}

export default connect(mapStateToProps)(Start)
