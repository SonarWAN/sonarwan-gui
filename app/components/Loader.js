import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { ProgressBar } from '@blueprintjs/core'

class Loader extends React.Component {
  constructor() {
    super()
    this.state = { count: 0 }
    this.timer = null
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const count = (this.state.count + 1) % 4
      this.setState({ count })
    }, 200)
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  render() {
    const { progress } = this.props

    let file = progress.file
    if (file) {
      file = file.split(/[\\/]/).pop()
    }

    return (
      <div className="loader">
        <div className="pt-card pt-elevation-1">
          <ProgressBar />
          <div className="m-t text-center">
            <small className="pt-text-muted">{file}</small>
            <br />
            <small className="pt-text-muted">{progress.packets} packets processed</small>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ progress: state.progress })

export default connect(mapStateToProps)(Loader)
