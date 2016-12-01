import React from 'react'
import moment from 'moment'
import sortBy from 'lodash/sortBy'

const d3 = require('d3')

function bytesToString(bytes) {
	var fmt = d3.format('.0f');
	if (bytes < 1024) {
		return fmt(bytes) + ' B';
	} else if (bytes < 1024 * 1024) {
		return fmt(bytes / 1024) + ' kB';
	} else if (bytes < 1024 * 1024 * 1024) {
		return fmt(bytes / 1024 / 1024) + ' MB';
	} else {
		return fmt(bytes / 1024 / 1024 / 1024) + ' GB';
	}
}


export default class ActivityChart extends React.Component {
  static propTypes = {
    activity: React.PropTypes.object.isRequired,
    start: React.PropTypes.instanceOf(Date),
    end: React.PropTypes.instanceOf(Date),
  }

  getTimeStep() {
    const second = 1000

    if (end - start > 3 * hour) {
      return 60 * second
    }

    return second
  }

  getActivity() {
    const { start, end } = this.props
    let ret = []

    for (let key of Object.keys(this.props.activity)) {
      ret.push({ date: new Date(key), value: this.props.activity[key] })
    }

    ret = sortBy(ret, d => d.date);

    if (start < ret[0].date)
      ret.unshift({ date: start, value: 0 })
    if (end > ret[ret.length - 1].date)
      ret.push({ date: end, value: 0 })

    return ret
  }

  getData() {
    const { start, end } = this.props

    const activity = this.getActivity()
    const data = []

    for (let i = 0; i < activity.length - 1; i++) {
      var d1 = activity[i].date
      var d2 = activity[i + 1].date

      data.push(activity[i])

      let diff = d2 - d1
      if (diff == 2 * 1000) {
        data.push({ date: new Date(d1.valueOf() + 1000), value: 0 })
      } else if (diff > 2 * 1000) {
        data.push({ date: new Date(d1.valueOf() + 1000), value: 0 })
        data.push({ date: new Date(d2.valueOf() - 1000), value: 0 })
      }
    }

    data.push(activity[activity.length - 1])

    return data
  }

  componentDidMount() {
    this.chart.setAttribute('width', this.chart.parentNode.offsetWidth - 40) // padding
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
      .call(d3.axisLeft(y).tickFormat(bytesToString))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .style("text-anchor", "end")
      .text("Network I/O");

    g.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
  }

  render() {
    return (
      <div className="pt-card pt-elevation-1 m-b-md">
        <svg width="960" height="200" ref={(canvas) => this.chart = canvas} />
      </div>
    )
  }
}
