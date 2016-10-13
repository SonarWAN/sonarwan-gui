import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import Sidebar from '../components/Sidebar'
import * as deviceUtils from '../device-utils'

class DeviceChart extends React.Component {
  render() {
    return <p>Here goes the device chart.</p>
  }
}

class DeviceActivityTable extends React.Component {
  render() {
    return <p>Here goes the device activity table.</p>
  }
}

class DeviceDetails extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  componentDidMount() {
    if (!this.props.device)
      this.context.router.push('/')
  }

  render() {
    if (!this.props.device)
      return null

    return (
      <div className="app">
        <div className="app-body">
          <Sidebar />
          <div className="app-content">
            <h1>{deviceUtils.prettyName(this.props.device)}</h1>
            <DeviceChart />
            <DeviceActivityTable />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (!state.data) {
    return {}
  }

  const deviceId = ownProps.params.deviceId
  return {
    device: state.data.devices[deviceId]
  }
}

export default connect(mapStateToProps)(DeviceDetails)
