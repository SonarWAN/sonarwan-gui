import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from 'recharts'

import Sidebar from '../components/Sidebar'
import * as deviceUtils from '../device-utils'

class DeviceChart extends React.Component {
  getData() {
		return [
			{name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
			{name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
			{name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
			{name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
			{name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
			{name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
			{name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
		]
  }

  render() {
		return (
      <LineChart width={700} height={300} data={this.getData()}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      </LineChart>
    )
  }
}

class DeviceActivityTable extends React.Component {
	getData() {
		return [
			{ 'Foo': 'Bar', 'Baz': 'Qux' },
			{ 'Foo': 'Bar', 'Baz': 'Qux' },
			{ 'Foo': 'Bar', 'Baz': 'Qux' },
			{ 'Foo': 'Bar', 'Baz': 'Qux' },
		]
	}

  render() {
    const data = this.getData()
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Foo</th>
            <th>Bar</th>
          </tr>
        </thead>
        <tbody>
          {data.map(this.renderRow.bind(this))}
        </tbody>
      </table>
		)
  }

  renderRow(row) {
    return (
      <tr>
        <td>{row.Foo}</td>
        <td>{row.Baz}</td>
      </tr>
    )
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
