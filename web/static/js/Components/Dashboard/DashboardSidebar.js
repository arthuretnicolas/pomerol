// @flow

import React from 'react'
import { Link } from 'react-router'

type Props = {
  active: number,
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

const renderCategory = ({ category, options }, active, index) => (
  <div className='container-category' key={index}>
    <div className='title-category'>
      {category}
    </div>

    <div className='container-options'>
      {
        options.map(opt => (
          <Link
            className={`option ${opt.id === active ? 'option-selected' : ''}`}
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

const DashboardSidebar = ({ active, data }: Props) => (
  <div className='Dashboard-DashboardSidebar'>
    {
      data.map((item, index) => renderCategory(item, active, index))
    }
  </div>
)

export default DashboardSidebar
