import React from 'react'
import { connect } from 'react-redux'

import ActivityChart from './ActivityChart'

class Service extends React.Component {
  static propTypes = {
    service: React.PropTypes.object.isRequired,
    start: React.PropTypes.instanceOf(Date).isRequired,
    end: React.PropTypes.instanceOf(Date).isRequired
  }

  renderList(title, items) {
    if (items.length > 0) {
      return (
        <div>
          <h5>{title}</h5>
          <ul>
            {items.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      )
    }
  }

  render() {
    const { service, start, end } = this.props

    return (
      <div>
        <h4 className="page-header">
          {service.name}
          &nbsp;
          <span className="pt-text-muted">({service.type})</span>
        </h4>

        <ActivityChart
          activity={service.activity}
          start={start}
          end={end}
        />

        {this.renderList("Hosts", service.hosts)}
        {this.renderList("IPs", service.ips)}

        <hr />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  start: new Date(state.data.summary.start_time),
  end: new Date(state.data.summary.end_time),
})

export default connect(mapStateToProps)(Service)
