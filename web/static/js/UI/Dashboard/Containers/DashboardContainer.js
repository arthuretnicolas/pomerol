// @flow

import React from 'react'
import { connect } from 'react-redux'
import DashboardSidebar from '../../Dashboard/Components/DashboardSidebar'
import { sidebarOptions } from '../../../Data/index'
import { getOnboardingCompletedSteps } from '../../../Helpers'

type Props = {
  children: React.Element<*>,
  onboardingCompletedSteps: number
}

const DashboardContainer = ({ children, onboardingCompletedSteps }: Props) => {
  if (onboardingCompletedSteps !== 2) {
    return null
  }

  return (
    <div className='Dashboard-DashboardContainer'>
      <DashboardSidebar
        data={sidebarOptions}
      />

      <div className='container-content'>
        {children}
      </div>
    </div>
  )
}

const mapStateToProps = ({ login }) => ({
  onboardingCompletedSteps: getOnboardingCompletedSteps(login.session.user)
})

export default connect(mapStateToProps)(DashboardContainer)
