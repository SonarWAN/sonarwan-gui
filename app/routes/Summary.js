import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Classes } from '@blueprintjs/core'

class Statcard extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.string,
		]).isRequired
  }

  render() {
    const { label, value } = this.props

    return (
      <div className={`pt-card ${Classes.ELEVATION_1} m-b`}>
        <h3>{value}</h3>
        <p className="pt-text-muted m-b-0">{label}</p>
      </div>
    )
  }
}


class Summary extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    summary: React.PropTypes.object
  }

  componentDidMount() {
    if (!this.props.summary) {
      this.context.router.push('/')
    }
  }

  getTotalDuration() {
    const { start_time, end_time } = this.props.summary
    return moment.duration(new Date(end_time) - new Date(start_time)).humanize()
  }

  render() {
    const { summary } = this.props

    if (!summary)
        return null

    return (
      <div>
        <h1 className="page-header">Summary</h1>

        <div className="row">
          <div className="col-md-4 col-sm-6">
            <Statcard label="Devices identified" value={summary.devices} />
          </div>
          <div className="col-md-4 col-sm-6">
            <Statcard label="Authorless services" value={summary.authorless_services} />
          </div>
          <div className="col-md-4 col-sm-6">
            <Statcard label="Total duration" value={this.getTotalDuration()} />
          </div>
          <div className="col-md-4 col-sm-6">
            <Statcard label="Files processed" value={summary.files} />
          </div>
          <div className="col-md-4 col-sm-6">
            <Statcard label="Packets analyzed" value={summary.packets} />
          </div>
          <div className="col-md-4 col-sm-6">
            <Statcard label="Execution time" value={summary.execution_time + ' seconds'} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  summary: state.data && state.data.summary
})

export default connect(mapStateToProps)(Summary)
