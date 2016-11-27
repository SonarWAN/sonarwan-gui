import React, { Component } from 'react'
import {
  ListView,
  ListViewHeader,
  ListViewFooter,
  ListViewSection,
  ListViewSectionHeader,
  ListViewRow,
  ListViewSeparator,
  Text
} from 'react-desktop/macOs';
import { connect } from 'react-redux'
import { Link } from 'react-router'

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
      <ListView background="#f1f2f4" width="240" height="auto" className="app-sidebar">
        <Link to="/summary">
          <ListViewRow>
            <Text color="#414141" size="13">Summary</Text>
          </ListViewRow>
        </Link>
        <ListViewSection header={this.renderSectionHeader('Devices')}>
          {this.props.devices.map((device, i) => this.renderDeviceItem(device, i))}
          <Link to="/authorless">
            <ListViewRow>
              <SidebarIcon name="question-circle-o" />
              <Text color="#414141" size="13">Authorless Services</Text>
            </ListViewRow>
          </Link>
        </ListViewSection>
        <ListViewSeparator/>
      </ListView>
    );
  }

  renderSectionHeader(title) {
    return (
      <ListViewSectionHeader>
        {title}
      </ListViewSectionHeader>
    );
  }

  renderDeviceItem(device, i) {
    return (
      <Link to={"/devices/" + i}>
        <ListViewRow key={i}>
          <SidebarIcon name={deviceUtils.icon(device)} />
          <Text color="#414141" size="13">{deviceUtils.prettyName(device)}</Text>
        </ListViewRow>
      </Link>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    devices: state.data && state.data.devices || [],
  }
}

export default connect(mapStateToProps)(Sidebar)
