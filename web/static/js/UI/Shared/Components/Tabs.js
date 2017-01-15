// @flow

import React from 'react'

type Props = {
  onSelect: (selectedIndex: number) => void,
  tabs: Array<{
    id: number,
    label: string
  }>,
  selectedIndex: number,
  className?: string,
  containerStyle?: Object,
  tabStyle?: Object
}

const _Tabs = ({
  onSelect,
  tabs,
  selectedIndex = 0,
  className = '',
  containerStyle = {},
  tabStyle = {}
}: Props) => (
  <div
    style={containerStyle}
    className={`
      Shared-Tabs
      ${className}
    `}
  >
    {
      tabs.map(tab => (
        <div
          key={tab.id}
          style={tabStyle}
          className={`
            tab
            ${selectedIndex === tab.id ? 'selected' : ''}
          `}
          onClick={() => onSelect(tab.id)}
        >
          { tab.label }
        </div>
      ))
    }
  </div>
)

export default _Tabs
