import React from 'react'
import { connect } from 'react-redux'

class Navbar extends React.Component {
  render() {
    return (
      <nav className="pt-navbar pt-dark">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">SonarWAN</div>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <button className="pt-button pt-minimal pt-icon-home">Help</button>
          <span className="pt-navbar-divider"></span>
          <button className="pt-button pt-minimal pt-icon-cog"></button>
        </div>
      </nav>
    )
  }
}

export default connect()(Navbar)
