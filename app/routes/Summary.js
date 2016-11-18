import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import Sidebar from '../components/Sidebar'

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
    return (
      <div className="app-body">
        <Sidebar />
        <div className="app-content">
          <h1>Summary</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ data: state.data })

export default connect(mapStateToProps)(Summary)
