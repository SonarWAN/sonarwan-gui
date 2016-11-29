import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class Navbar extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  render() {
    return (
      <nav className="pt-navbar pt-dark">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">
            <Link to="/">SonarWAN</Link>
          </div>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <button className="pt-button pt-minimal pt-icon-help">Help</button>
          <span className="pt-navbar-divider"></span>
          <button className="pt-button pt-minimal pt-icon-cog" onClick={e => this.context.router.push('/settings')}></button>
        </div>
      </nav>
    )
  }
}

export default connect()(Navbar)
