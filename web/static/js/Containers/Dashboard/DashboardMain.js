// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

type Props = {
}

class DashboardMain extends Component {
  props: Props

  render () {
    return (
      <div className='container-content'>
        Main
      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMain)
