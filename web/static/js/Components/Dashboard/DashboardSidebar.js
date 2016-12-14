// @flow

import React from 'react'
import { browserHistory, Link } from 'react-router'

type Props = {
  data: Array<{
    category: string,
    options: Array<{
      id: number,
      label: string,
      icon: string,
      link: string
    }>
  }>
}

const renderCategory = ({ category, options }, index) => {
  const pathname = browserHistory.getCurrentLocation().pathname // e.g: '/dashboard'

  return (
    <div className='container-category' key={index}>
      <div className='title-category'>
        {category}
      </div>

      <div className='container-options'>
        {
          options.map(opt => (
            <Link
              className={`option ${opt.link === pathname ? 'option-selected' : ''}`}
              key={opt.id}
              to={opt.link}
            >
              {opt.label}
            </Link>
          ))
        }
      </div>
    </div>
  )
}

const DashboardSidebar = ({ data }: Props) => (
  <div className='Dashboard-DashboardSidebar'>
    {
      data.map((item, index) =>
        renderCategory(item, index))
    }
  </div>
)

export default DashboardSidebar
