import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Button from '../components/Button';

import Sidebar from '../components/Sidebar'
import { openFile } from '../actions'

class Start extends React.Component {
  handleOpen() {
    this.props.dispatch(openFile())
  }

  handleLoad() {
    console.log('load functionality not supported')
  }

  render() {
    return (
      <div className="app-content">
        <form className="text-center">
          <h1>Getting Started</h1>

          <p>Select .pcap files to analize in SonarWAN</p>
          <Button color="blue" onClick={this.handleOpen.bind(this)}>Open files</Button>
          &nbsp;
          <Button color="blue" onClick={this.handleLoad.bind(this)}>Load analysis</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { path: state.path }
}

export default connect(mapStateToProps)(Start)
