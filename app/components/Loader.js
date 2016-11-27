import React from 'react'
import ReactDOM from 'react-dom'
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
    return (
      <div className="loader">
        <ProgressBar />
      </div>
    )
  }
}

export default Loader
