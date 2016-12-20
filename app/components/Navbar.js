import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { saveAnalysis } from '../actions'

class Navbar extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    data: React.PropTypes.object
  }

  handleSaveAnalysis() {
    this.props.dispatch(saveAnalysis(this.props.data))
  }

  renderSaveButton() {
    if (this.props.data) {
      return (
        <button className="pt-button pt-minimal pt-icon-floppy-disk" onClick={this.handleSaveAnalysis.bind(this)}>
          Save analysis
        </button>
      )
    }
  }

  render() {
    return (
      <nav className="pt-navbar pt-dark pt-fixed-top">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">
            <Link to="/">SonarWAN</Link>
          </div>
        </div>
        <div className="pt-navbar-group pt-align-right">
          {this.renderSaveButton()}
          <button className="pt-button pt-minimal pt-icon-help">Help</button>
          <span className="pt-navbar-divider"></span>
          <button className="pt-button pt-minimal pt-icon-cog" onClick={e => this.context.router.push('/settings')}></button>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({ data: state.data })

export default connect(mapStateToProps)(Navbar)
