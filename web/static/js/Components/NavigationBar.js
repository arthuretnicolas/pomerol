// @flow

import React from 'react'
import { Link } from 'react-router'

type Props = {
  navigationItems?: Array<{
    name: string,
    link: string
  }>
}

const _navigationItems = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Counters',
    link: '/counters'
  },
  {
    name: 'Github Users',
    link: '/github-users'
  }
]

const NavigationBar = ({ navigationItems = _navigationItems }: Props) => (
  <div style={{
    marginBottom: 15,
    flexDirection: 'row'
  }}>
    {
      navigationItems.map((item, index: number) => (
        <span
          key={index}
          style={{
            marginLeft: index > 0 ? 10 : 0
          }}
        >
          <Link to={item.link}>
            {item.name}
          </Link>
        </span>
      ))
    }
  </div>
)

export default NavigationBar
