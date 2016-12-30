// @flow

import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import EmptyStateDashboard from '../../Shared/Components/EmptyStateDashboard'

type Props = {
  isAuthenticated: boolean,
  children: React<*>
}

class ProtectedView extends Component {
  props: Props

  componentWillMount () {
    this._checkAuth()
  }

  componentWillReceiveProps (nextProps) {
    this._checkAuth(nextProps.isAuthenticated)
  }

  _checkAuth = (isAuthenticated: boolean = this.props.isAuthenticated) => {
    if (!isAuthenticated && browserHistory) {
      browserHistory.push('/login/dashboard')
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
  isAuthenticated: !!login.session.user.id
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedView)
