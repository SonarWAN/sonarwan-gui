import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import Sidebar from '../components/Sidebar'


class Statcard extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired
  }

  render() {
    const { label, value } = this.props

    return (
      <div className="statcard">
        <h3>{value}</h3>
        <p className="lead">{label}</p>
      </div>
    )
  }
}


class Summary extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    device: React.PropTypes.object
  }

  componentDidMount() {
    if (!this.props.data) {
      this.context.router.push('/')
    }
  }

  render() {
    const { summary } = this.props.data

    return (
      <div className="app-body">
        <Sidebar />
        <div className="app-content">
          <h1>Summary</h1>

          <div className="row">
            <div className="col-md-6">
              <Statcard label="Devices" value={summary.devices} />
            </div>
            <div className="col-md-6">
              <Statcard label="Authorless services" value={summary.authorless_services} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Statcard label="Files processed" value={summary.files} />
            </div>
            <div className="col-md-6">
              <Statcard label="Packets processed" value={summary.packets} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps)(Summary)
