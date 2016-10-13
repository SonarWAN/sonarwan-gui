import React, { Component } from 'react';
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

import * as deviceUtils from '../device-utils'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
  }

  render() {
    return (
      <ListView background="#f1f2f4" width="240" height="auto" className="app-sidebar">
        {/*<ListViewHeader>
          <Text size="11" color="#696969">Order by name</Text>
        </ListViewHeader>*/}
        <ListViewSection header={this.renderSectionHeader('Devices')}>
          {this.props.devices.map((device, i) => this.renderDeviceItem(device, i))}
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
      <ListViewRow key={i}
        onClick={() => this.setState({ selected: i })}
        background={this.state.selected === i ? '#d8dadc' : null}>
        <Text color="#414141" size="13">{deviceUtils.prettyName(device)}</Text>
      </ListViewRow>
    );
  }
}

const mapStateToProps = (state) => {
  if (!state.data) {
    return {
      devices: [],
    }
  }

  return {
    devices: state.data.devices,
  }
}

export default connect(mapStateToProps)(Sidebar)
