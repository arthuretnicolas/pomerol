// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import DashboardSidebar from '../../Components/Dashboard/DashboardSidebar'
import { sidebarOptions } from '../../Data/index'

type Props = {
  children: React.Element<*>
}

class DashboardContainer extends Component {
  props: Props

  render () {
    const { children } = this.props
    const pathname = browserHistory.getCurrentLocation().pathname // e.g: '/dashboard'

    return (
      <div className='Dashboard-DashboardContainer'>
        <DashboardSidebar
          pathname={pathname}
          data={sidebarOptions}
        />

        <div className='container-content'>
          {children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
