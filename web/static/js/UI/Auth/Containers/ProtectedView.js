// @flow

import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import EmptyStateDashboard from '../../Shared/Components/EmptyStateDashboard'
import { hasCompleteProfile } from '../../../Helpers'

type Props = {
  isAuthenticated: boolean,
  children: React<*>,
  hasCompleteProfile: boolean,
  location: Object
}

class ProtectedView extends Component {
  props: Props

  componentWillMount () {
    this._checkAuth()
  }

  componentWillReceiveProps (nextProps) {
    this._checkAuth(nextProps.isAuthenticated, nextProps.hasCompleteProfile)
  }

  _checkAuth = (
    isAuthenticated: boolean = this.props.isAuthenticated,
    hasCompleteProfile: boolean = this.props.hasCompleteProfile
  ) => {
    if (!browserHistory) {
      return null
    }

    if (!isAuthenticated) {
      browserHistory.push('/login/dashboard')
    }

    const isOnboarding =
      [ 'onboarding-one', 'onboarding-two' ].includes(this.props.location.pathname.split('/')[1])

    if (!hasCompleteProfile && !isOnboarding) {
      browserHistory.push('/onboarding-one')
    }

    if (hasCompleteProfile && isOnboarding) {
      browserHistory.push('/dashboard')
    }
  }

  render () {
    const { children, isAuthenticated } = this.props

    if (!isAuthenticated) {
      return <EmptyStateDashboard />
    }

    return children
  }
}

const mapStateToProps = ({ login }) => ({
  isAuthenticated: !!login.session.user,
  hasCompleteProfile: hasCompleteProfile(login.session.user)
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedView)
