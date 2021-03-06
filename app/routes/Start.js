import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Button, Classes, Intent } from '@blueprintjs/core';

import Sidebar from '../components/Sidebar'
import { openFile, loadAnalysis } from '../actions'

class Start extends React.Component {
  handleOpen() {
    this.props.dispatch(openFile())
  }

  handleLoad() {
    this.props.dispatch(loadAnalysis())
  }

  render() {
    return (
      <div className={`start-page pt-card ${Classes.ELEVATION_1}`}>
        <h1>SonarWAN</h1>
        <hr />
        <h3 className="pt-text-muted">Getting Started</h3>

        <p>Select .pcap or .pcapng files to analize in SonarWAN</p>
        <Button intent={Intent.PRIMARY} className="pt-large" iconName="document-open" onClick={this.handleOpen.bind(this)}>Open files</Button>
        &nbsp;
        <Button className="pt-large" onClick={this.handleLoad.bind(this)}>Load analysis</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { path: state.path }
}

export default connect(mapStateToProps)(Start)
