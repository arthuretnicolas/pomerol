// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardSidebar from '../../Components/Dashboard/DashboardSidebar'
import { sidebarOptions } from '../../Data/index'

type Props = {
}

class DashboardMain extends Component {
  props: Props

  render () {
    return (
      <div className='Dashboard-DashboardMain'>
        <DashboardSidebar
          active={0}
          data={sidebarOptions}
        />

        <div className='container-content'>
          content
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMain)
