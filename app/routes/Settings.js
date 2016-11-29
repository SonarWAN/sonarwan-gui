import React from 'react'
import { connect } from 'react-redux'
import { Button, Intent } from '@blueprintjs/core'

import { loadSettings, saveSettings } from '../actions'

class Settings extends React.Component {
  static propTypes = {
    settings: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      settings: {
        sonarwanExecutable: '',
        programArgs: '',
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(loadSettings())
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ settings: nextProps.settings })
  }

  handleSave() {
    this.props.dispatch(saveSettings(this.state.settings))
  }

  getConfig(key) {
    return this.state.settings[key] || this.props.settings[key]
  }

  setConfig(key, value) {
    const settings = Object.assign(
      {},
      this.state.settings,
      { [key]: value }
    )
    this.setState({ settings })
  }

  render() {
    const { settings } = this.props

    return (
      <div className="app-content">
        <h1 className="page-header">Settings</h1>

        <form action="">
          <label className="pt-label .modifier">
            SonarWAN executable
            <input
              className="pt-input"
              style={{ width: 300 }}
              type="text"
              placeholder="sonarwan"
              dir="auto"
              value={this.getConfig('sonarwanExecutable')}
              onChange={e => this.setConfig('sonarwanExecutable', e.target.value)}
            />
          </label>
          <label className="pt-label .modifier">
            Program Arguments
            <input
              className="pt-input"
              style={{ width: 300 }}
              type="text"
              placeholder=""
              dir="auto"
              value={this.getConfig('programArgs')}
              onChange={e => this.setConfig('programArgs', e.target.value)}
            />
          </label>
          <hr />
          <Button intent={Intent.PRIMARY} onClick={this.handleSave.bind(this)}>Save changes</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ settings: state.settings || {} })

export default connect(mapStateToProps)(Settings)
