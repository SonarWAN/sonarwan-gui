import React from 'react'
import { connect } from 'react-redux'
import { Classes, NonIdealState } from '@blueprintjs/core'

import ActivityChart from '../components/ActivityChart'
import Service from '../components/Service'
import * as deviceUtils from '../device-utils'


class Table extends React.Component {
  render() {
    return (
      <div>
        <h4>{this.props.title}</h4>
        <table className="pt-table pt-striped pt-condensed pt-elevation-0 m-b-md">
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {this.props.children}
          </tbody>
        </table>
      </div>
    )
  }
}

class TableRow extends React.Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.any).isRequired
  }

  render() {
    return (
      <tr>
        {this.props.data.map((val, i) => <td key={i}>{val}</td>)}
      </tr>
    )
  }
}

class DeviceCharacteristics extends React.Component {
  static propTypes = {
    device: React.PropTypes.object.isRequired
  }

  render() {
    const { characteristics } = this.props.device

    return (
      <Table title="Characteristics">
        {Object.keys(characteristics).filter(key => key !== 'services').map((key) =>
          <TableRow key={key} data={[key, characteristics[key]]} />
        )}
      </Table>
    )
  }
}

class DeviceApps extends React.Component {
  static propTypes = {
    device: React.PropTypes.object.isRequired
  }

  renderApps() {
    const { apps } = this.props.device

    if (apps.length > 0) {
      return apps.map((app, i) => {
        return (
          <div key={i}>
            <AppTable app={app} />
            {app.services.map((service, j) => <Service key={j} service={service} />)}
          </div>
        )
      })
    } else {
			return (
				<NonIdealState
					title="No apps found :("
          description="We couldn't associate any apps with this device."
          visual="delete"
        />
      )
    }
  }

  render() {
    return (
      <div>
        <h2 className="page-header">Apps</h2>
        {this.renderApps()}
      </div>
    )
  }
}

class AppTable extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired
  }

  render() {
    const { app } = this.props
    const { characteristics } = app

    return (
      <Table title={characteristics.name || 'Unknown app'}>
        {Object.keys(characteristics).filter(key => key !== 'name').map((key) =>
          <TableRow key={key} data={[key, characteristics[key]]} />
        )}
      </Table>
    )
  }
}

class DeviceDetails extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    summary: React.PropTypes.object,
    device: React.PropTypes.object
  }

  componentDidMount() {
    if (!this.props.device)
      this.context.router.push('/')
  }

  render() {
    if (!this.props.device)
      return null

    const { start_time, end_time } = this.props.summary

    return (
      <div>
        <h1 className="page-header">
          {deviceUtils.prettyName(this.props.device)}
          &nbsp;
          <span className="pt-text-muted">(#{this.props.params.deviceId})</span>
        </h1>
        <ActivityChart
          activity={this.props.device.activity}
          start={new Date(start_time)}
          end={new Date(end_time)}
        />
        <DeviceCharacteristics device={this.props.device} />
        <DeviceApps device={this.props.device} />
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
    summary: state.data.summary,
    device: state.data.devices[deviceId],
  }
}

export default connect(mapStateToProps)(DeviceDetails)
