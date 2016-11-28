import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

const d3 = require('d3')

import Sidebar from '../components/Sidebar'
import Service from '../components/Service'
import * as deviceUtils from '../device-utils'

class Authorless extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    services: React.PropTypes.arrayOf(
      React.PropTypes.object
    )
  }

  componentDidMount() {
    if (!this.props.services)
      this.context.router.push('/')
  }

  render() {
    const { services } = this.props

    if (!services)
      return null

    return (
      <div>
        <h1 className="page-header">Authorless Services</h1>
        {services.map((service, i) => <Service key={i} service={service} />)}
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
    services: state.data.authorless_services,
  }
}

export default connect(mapStateToProps)(Authorless)
