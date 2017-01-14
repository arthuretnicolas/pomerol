// @flow

import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

type Props = {
  onSelect: () => void,
  tabs: Array<string>,
  panels: Array<any>,
  selectedIndex: number,
  className?: string
}

const _Tabs = ({
  onSelect,
  tabs,
  panels,
  selectedIndex = 0,
  className = ''
}: Props) => {
  Tabs.setUseDefaultStyles(false)

  return (
    <Tabs
      className={`
        Shared-Tabs
        ${className}
      `}
      onSelect={onSelect}
      selectedIndex={selectedIndex}
    >
      <TabList className='tab-list'>
        {
          tabs.map((tab, index) => (
            <Tab
              key={index}
              className={`
                tab
                ${selectedIndex === index ? 'selected' : ''}
              `}
            >
              {tab}
            </Tab>
          ))
        }
      </TabList>

      {
        panels.map((Panel, index) => (
          <TabPanel
            key={index}
            className='tab-panel'
            children={Panel}
          />
        ))
      }
    </Tabs>
  )
}

export default _Tabs
