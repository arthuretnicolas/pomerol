// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardSidebar from '../../Dashboard/Components/DashboardSidebar'
import EmptyStateDashboard from '../../Shared/Components/EmptyStateDashboard'
import { sidebarOptions } from '../../../Data/index'
import { getOnboardingCompletedSteps } from '../../../Helpers'
import LoginActions from '../../../Reducers/LoginRedux'
import ModalContainer from './ModalContainer'

type Props = {
  children: React.Element<*>,
  onboardingCompletedSteps: number,
  organizations: Array<Object>,
  updateOrganization: () => void,
  logout: () => void,
  currentOrganizationId: string | null
}

class DashboardContainer extends Component {
  props: Props

  _onLogout = () => {
    const { logout } = this.props
    const confirmation = window.confirm('Are you sure that you want to log out ?')

    if (confirmation) {
      logout()
    }
  }

  render () {
    const {
      children,
      onboardingCompletedSteps,
      organizations,
      updateOrganization,
      currentOrganizationId
    } = this.props

    if (onboardingCompletedSteps !== 2) {
      return <EmptyStateDashboard />
    }

    return (
      <div className='Dashboard-DashboardContainer'>
        <DashboardSidebar
          organizations={organizations}
          selectedOrganizationId={currentOrganizationId}
          data={sidebarOptions}
          onChange={updateOrganization}
          onClickLogout={this._onLogout}
        />

        <div className='container-content'>
          <ModalContainer />
          {children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({
  onboardingCompletedSteps: getOnboardingCompletedSteps(login.session),
  organizations: login.session.organizations,
  currentOrganizationId: login.session.user && login.session.user.current_organization_id
})

const mapDispatchToProps = dispatch => ({
  updateOrganization: (id: number) =>
    dispatch(LoginActions.updateUserAttempt({ current_organization_id: id })),
  logout: () => dispatch(LoginActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
