// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

type Props = {
}

class DashboardMain extends Component {
  props: Props

  render () {
    return (
      <div className='Dashboard-DashboardMain'>
        Main
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMain)
