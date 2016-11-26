import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

const d3 = require('d3')

import Sidebar from '../components/Sidebar'
import * as deviceUtils from '../device-utils'

class DeviceChart extends React.Component {
  static propTypes = {
    device: React.PropTypes.object.isRequired
  }

  getData() {
		var data = []
		for (var i = 0; i < 10; i++) {
      data.push({
        timestamp: new Date(),
        bytes: Math.random() * 300
      })
		}
    console.log(data)
    return data
  }

	componentDidMount() {
		var svg = d3.select(this.chart),
				margin = {top: 20, right: 20, bottom: 30, left: 40},
				width = +svg.attr("width") - margin.left - margin.right,
				height = +svg.attr("height") - margin.top - margin.bottom;

		var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
				y = d3.scaleLinear().rangeRound([height, 0]);

		var g = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = this.getData()

    x.domain(data.map(function(d) { return d.timestamp; }));
    y.domain([0, d3.max(data, function(d) { return d.bytes; })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Bytes Transferred");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.timestamp); })
        .attr("y", function(d) { return y(d.bytes); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.bytes); });
	}

  render() {
    return <svg width="960" height="500" ref={(svg) => this.chart = svg} />
  }
}


class Table extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <table className="table table-striped">
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

  render() {
    const { apps } = this.props.device

    return (
      <div>
        <h2>Apps</h2>
        {apps.map(service => <AppTable service={service} />)}
      </div>
    )
  }
}

class AppTable extends React.Component {
  render() {
    const { service } = this.props
    const { characteristics } = service

    return (
      <Table title={characteristics.name || 'Unknown service'}>
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
    device: React.PropTypes.object
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
            <DeviceChart device={this.props.device} />
            <DeviceCharacteristics device={this.props.device} />
            <DeviceApps device={this.props.device} />
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
    device: state.data.devices[deviceId],
  }
}

export default connect(mapStateToProps)(DeviceDetails)
