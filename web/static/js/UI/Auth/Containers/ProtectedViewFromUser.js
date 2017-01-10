// @flow-weak

import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import EmptyStateDashboard from '../../Shared/Components/EmptyStateDashboard'
import EmptyStateAuth from '../../Shared/Components/EmptyStateAuth'

type Props = {
  isRehydrated: boolean,
  isAuthenticated: boolean,
  params: {
    origin?: string
  }
}

class ProtectedViewFromUser extends Component {
  props: Props

  componentWillMount () {
    this._checkAuth()
  }

  componentWillReceiveProps (nextProps) {
    this._checkAuth(nextProps.isAuthenticated)
  }

  _checkAuth = (isAuthenticated: boolean = this.props.isAuthenticated) => {
    const origin = this.props.params.origin || 'dashboard'

    if (isAuthenticated) {
      browserHistory.push(`/${origin}`)
    }
  }

  _renderPlaceholder = () => {
    const { origin } = this.props.params

    const showLoginPlaceholder = ![
      'contacts',
      'dashboard',
      'quotes',
      'billing',
      'profile',
      'settings'
    ].includes(origin)

    // const showLoginPlaceholder = [ 'login', 'signup', 'reset-password' ].includes(this.props.location.pathname.split('/')[1])

    if (showLoginPlaceholder) {
      return (
        <EmptyStateAuth />
      )
    }

    return (
      <EmptyStateDashboard />
    )
  }

  render () {
    const {
      children,
      isRehydrated,
      isAuthenticated
    } = this.props

    if (isAuthenticated || !isRehydrated) {
      return this._renderPlaceholder()
    }

    return (
      <div style={{ display: 'flex', flex: 1 }}>
        {children}
      </div>
    )
  }
}

const mapStateToProps = ({ startup, login }) => ({
  isAuthenticated: !!(login.session && login.session.user),
  isRehydrated: startup.rehydrated,
  login
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedViewFromUser)
