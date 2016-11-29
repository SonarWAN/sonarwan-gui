import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Classes, Menu, MenuItem, MenuDivider } from '@blueprintjs/core';

import * as deviceUtils from '../device-utils'


function SidebarIcon({ name }) {
  return <span className="sidebar-icon"><i className={'fa fa-' + name} />&nbsp;</span>
}

class Sidebar extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { selected: null };
  }

  render() {
    return (
      <div className="app-sidebar">
        <Menu className={Classes.ELEVATION_1}>
          <MenuItem
            iconName="dashboard"
            onClick={e => this.context.router.push('/summary')}
            text="Summary" />
          <MenuDivider title="Devices" />
          {this.props.devices.map((device, i) => this.renderDeviceItem(device, i))}
          <MenuDivider />
          <MenuItem
            iconName="error"
            onClick={e => this.context.router.push('/authorless')}
            text="Authorless services" />
        </Menu>
      </div>
    );
  }

  renderDeviceItem(device, i) {
    return (
      <MenuItem
        key={i}
        iconName={deviceUtils.icon(device)}
        onClick={e => this.context.router.push('/devices/' + i)}
        text={<span>{deviceUtils.prettyName(device)} <span className="pt-text-muted">(#{i})</span></span>} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    devices: state.data && state.data.devices || [],
  }
}

export default connect(mapStateToProps)(Sidebar)
