import React from 'react'
import ReactDOM from 'react-dom'

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

  getLabel() {
    const dots = '.'.repeat(this.state.count)
    const spaces = '\u00a0'.repeat(3 - this.state.count)
    return 'Loading' + dots + spaces
  }

  render() {
    return (
      <div className="loader">{this.getLabel()}</div>
    )
  }
}

export default Loader
