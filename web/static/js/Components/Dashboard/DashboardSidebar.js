// @flow

import React from 'react'
import { Link } from 'react-router'

type Props = {
  pathname: string,
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

const renderCategory = ({ category, options }, pathname, index) => (
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

const DashboardSidebar = ({ pathname, data }: Props) => (
  <div className='Dashboard-DashboardSidebar'>
    {
      data.map((item, index) =>
        renderCategory(item, pathname, index))
    }
  </div>
)

export default DashboardSidebar
