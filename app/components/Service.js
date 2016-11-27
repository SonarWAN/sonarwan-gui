import React from 'react'

export default class Service extends React.Component {
  static propTypes = {
    service: React.PropTypes.object.isRequired
  }

  render() {
    const { service } = this.props

    return (
      <div>
        <h4 className="page-header">
          {service.name}
          &nbsp;
          <span className="text-muted">({service.type})</span>
        </h4>

        <h5>Hosts</h5>
        <ul>
          {service.hosts.map(host => <li>{host}</li>)}
        </ul>

        <h5>IPs</h5>
        <ul>
          {service.ips.map(ip => <li>{ip}</li>)}
        </ul>

        <pre>
          {JSON.stringify(service.activity)}
        </pre>
      </div>
    )
  }
}
