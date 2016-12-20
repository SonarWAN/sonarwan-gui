import React from 'react'
import { connect } from 'react-redux'
import uniq from 'lodash/uniq'
import groupBy from 'lodash/groupBy'
import { Tabs, TabList, Tab, TabPanel } from '@blueprintjs/core'

const d3 = require('d3')

import Service from '../components/Service'
import * as deviceUtils from '../device-utils'

class Authorless extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    services: React.PropTypes.arrayOf(
      React.PropTypes.object
    )
  }

  componentDidMount() {
    if (!this.props.services)
      this.context.router.push('/')
  }

	getCategories() {
    return uniq(this.props.services.map(s => s.type))
  }

  renderCategoryTabs() {
    return this.getCategories().map(category => <Tab key={category}>{category}</Tab>)
  }

  renderTabPanels() {
    const servicesByType = groupBy(this.props.services, s => s.type)

    return this.getCategories().map(category => {
      return (
        <TabPanel key={category}>
          {servicesByType[category].map((service, i) => {
            return <Service key={i} service={service} />
          })}
        </TabPanel>
      )
    })
  }

  render() {
    const { services } = this.props

    if (!services)
      return null

    return (
      <div>
        <h1 className="page-header">Authorless Services</h1>
				<Tabs>
					<TabList>
            {this.renderCategoryTabs()}
					</TabList>
          {this.renderTabPanels()}
				</Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (!state.data) {
    return {}
  }

  const deviceId = ownProps.params.deviceId
  return {
    services: state.data.authorless_services,
  }
}

export default connect(mapStateToProps)(Authorless)
