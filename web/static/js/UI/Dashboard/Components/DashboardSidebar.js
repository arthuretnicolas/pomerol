// @flow

import React from 'react'
import { browserHistory } from 'react-router'
import Infos from '../../Shared/Components/Infos'

type Props = {
  data: Array<{
    category: string,
    options: Array<{
      id: number,
      label: string,
      iconName: string,
      link: string
    }>
  }>
}

const OrganisationPicker = () => (
  <div className='container-organization'>
    BigCorpo
  </div>
)

const DashboardSidebar = ({ data }: Props) => {
  const pathname = browserHistory && browserHistory.getCurrentLocation().pathname

  return (
    <div className='Dashboard-DashboardSidebar'>
      <OrganisationPicker />

      {
        data.map((item, index) => (
          <Infos
            theme='dashboard-sidebar'
            key={index}
            label={item.category}
            fields={
              item.options.map(({ id, iconName, label, link }) => ({
                id,
                iconName: iconName,
                label: label,
                link: link,
                isSelected: link === pathname
              }))
            }
          />
        ))
      }
    </div>
  )
}

export default DashboardSidebar
