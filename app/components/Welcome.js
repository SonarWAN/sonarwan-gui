import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import { openFile } from '../actions'

class Welcome extends React.Component {
  handleOpen() {
    this.props.dispatch(openFile())
  }

  render() {
    return (
      <form>
        <div>Hello World!</div>
        <button type="button" onClick={this.handleOpen.bind(this)}>Open file</button>
        {this.props.path && 'You selected: ' + this.props.path}
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return { path: state.path }
}

export default connect(mapStateToProps)(Welcome)
