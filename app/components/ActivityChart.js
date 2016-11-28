import React from 'react'
import moment from 'moment'

const d3 = require('d3')

export default class ActivityChart extends React.Component {
  static propTypes = {
    activity: React.PropTypes.object.isRequired
  }

  getData() {
    const { activity, start, end } = this.props
    const data = []

    for (var d = start; d <= end; d = new Date(d.valueOf() + 1000)) {

      var date = moment(d).milliseconds(0).toISOString().replace('.000Z', '')
      var value = activity[date] || 0

      data.push({ date: new Date(date), value })
    }

    return data
  }

  componentDidMount() {
    this.chart.setAttribute('width', this.chart.parentNode.offsetWidth)
    this.update()
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      d3.select(this.chart).selectAll("*").remove();
      this.update()
    }
  }

  update() {
    var svg = d3.select(this.chart)
    var margin = {top: 20, right: 20, bottom: 30, left: 50}
    var width = +svg.attr("width") - margin.left - margin.right
    var height = +svg.attr("height") - margin.top - margin.bottom

    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    var parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S");

    var x = d3.scaleTime()
      .rangeRound([0, width]);

    var y = d3.scaleLinear()
      .rangeRound([height, 0]);

    var line = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value); });

    var data = this.getData()

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.value; }));

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .style("text-anchor", "end")
      .text("Bytes Transfered");

    g.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
  }

  render() {
    return <svg width="960" height="200" ref={(canvas) => this.chart = canvas} />
  }
}
