// @flow

import React from 'react'
import DashboardSidebar from '../../Components/Dashboard/DashboardSidebar'
import { sidebarOptions } from '../../Data/index'

type Props = {
  children: React.Element<*>
}

const DashboardContainer = ({ children }: Props) => (
  <div className='Dashboard-DashboardContainer'>
    <DashboardSidebar
      data={sidebarOptions}
    />

    <div className='container-content'>
      {children}
    </div>
  </div>
)

export default DashboardContainer
