// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

type Props = {
}

class DashboardQuotes extends Component {
  props: Props

  render () {
    return (
      <div className='Dashboard-DashboardQuotes'>
        Quotes
      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardQuotes)
