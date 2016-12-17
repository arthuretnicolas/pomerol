// @flow-weak

import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import EmptyStateDashboard from '../../Shared/Components/EmptyStateDashboard'

type Props = {
  isAuthenticated: boolean
}

class ProtectedView extends Component {
  props: Props

  componentWillMount () {
    this._checkAuth()
  }

  componentWillReceiveProps () {
    this._checkAuth()
  }

  _checkAuth = () => {
    const { isAuthenticated } = this.props

    if (!isAuthenticated && browserHistory) {
      browserHistory.push('/login')
    }
  }

  render () {
    const { children, isAuthenticated } = this.props

    if (!isAuthenticated) {
      return <EmptyStateDashboard />
    }

    return (
      <div style={{ display: 'flex', flex: 1 }}>
        {children}
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({
  isAuthenticated: !!login.jwt
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedView)
