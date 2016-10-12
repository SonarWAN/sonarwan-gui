import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'react-desktop/macOs';

class Welcome extends React.Component {
  render() {
    return (
      <div className="app-content">
        <form>
          <h1>Getting Started</h1>
          <p>Select .pcap files to analize in SonarWAN</p>
          <Button color="blue" onClick={this.props.onOpenFile}>Open file</Button>
          {this.renderSelectedFile()}
        </form>
      </div>
    );
  }

  renderSelectedFile() {
    if (!this.props.path)
      return null

    return (
      <p>You selected: <code>{this.props.path.join(', ')}</code></p>
    )
  }
}

export default Welcome
