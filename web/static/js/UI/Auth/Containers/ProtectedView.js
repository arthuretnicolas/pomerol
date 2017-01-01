// @flow

import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import EmptyStateDashboard from '../../Shared/Components/EmptyStateDashboard'
import { getOnboardingCompletedSteps } from '../../../Helpers'

type Props = {
  isAuthenticated: boolean,
  children: React<*>,
  onboardingCompletedSteps: number,
  location: Object
}

class ProtectedView extends Component {
  props: Props

  componentWillMount () {
    this._checkAuth()
  }

  componentWillReceiveProps (nextProps) {
    this._checkAuth(nextProps.isAuthenticated, nextProps.onboardingCompletedSteps)
  }

  _checkAuth = (
    isAuthenticated: boolean = this.props.isAuthenticated,
    onboardingCompletedSteps: number = this.props.onboardingCompletedSteps
  ) => {
    if (!browserHistory) {
      return null
    }

    if (!isAuthenticated) {
      browserHistory.push('/login/dashboard')
    }

    const isOnboarding =
      [ 'onboarding-one', 'onboarding-two' ].includes(this.props.location.pathname.split('/')[1])

    if (!isOnboarding) {
      if (onboardingCompletedSteps === 0) {
        // should be onboarding on step 1
        browserHistory.push('/onboarding-one')
      } else {
        // should be onboarding on step 2
        browserHistory.push('/onboarding-two')
      }
    } else {
      if (onboardingCompletedSteps === 0) {
        const isOnboardingStepTwo = [ 'onboarding-two' ].includes(this.props.location.pathname.split('/')[1])

        if (isOnboardingStepTwo) {
          // should not access step 2 before finishing step 1
          browserHistory.push('/onboarding-one')
        }
      }

      if (onboardingCompletedSteps === 1) {
        const isOnboardingStepOne = [ 'onboarding-one' ].includes(this.props.location.pathname.split('/')[1])

        if (isOnboardingStepOne) {
          // should not access step 1 anymore
          browserHistory.push('/onboarding-two')
        }
      }

      if (onboardingCompletedSteps === 2) {
        // should not be onboarding anymore
        browserHistory.push('/dashboard')
      }
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
  onboardingCompletedSteps: getOnboardingCompletedSteps(login.session.user)
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedView)
