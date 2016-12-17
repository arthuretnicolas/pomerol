// @flow-weak

import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import EmptyStateDashboard from '../../Shared/Components/EmptyStateDashboard'

type Props = {
  isRehydrated: boolean,
  isAuthenticated: boolean
}

class ProtectedViewFromUser extends Component {
  props: Props

  componentWillMount () {
    this._checkAuth()
  }

  componentWillReceiveProps () {
    this._checkAuth()
  }

  _checkAuth = () => {
    const { isAuthenticated } = this.props

    if (isAuthenticated) {
      browserHistory.push('/dashboard')
    }
  }

  render () {
    const {
      children,
      isRehydrated,
      isAuthenticated
    } = this.props

    if (isAuthenticated || !isRehydrated) {
      return <EmptyStateDashboard />
    }

    return (
      <div style={{ display: 'flex', flex: 1 }}>
        {children}
      </div>
    )
  }
}

const mapStateToProps = ({ startup, login }) => ({
  isAuthenticated: !!login.jwt,
  isRehydrated: startup.rehydrated
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedViewFromUser)
