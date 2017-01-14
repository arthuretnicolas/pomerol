// @flow

import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

type Props = {
  onSelect: (currentIndex: number, previousIndex: number) => void,
  tabs: Array<string>,
  panels: Array<any>,
  selectedIndex: number,
  className?: string,
  title?: string
}

const _Tabs = ({
  onSelect,
  tabs,
  panels,
  selectedIndex = 0,
  className = '',
  title = ''
}: Props) => {
  Tabs.setUseDefaultStyles(false)

  return (
    <div
      className={`
        Shared-Tabs
        ${className}
      `}
    >
      {
        title !== '' && <div className='title'>
          {title}
        </div>
      }

      <Tabs
        className='main'
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
    </div>
  )
}

export default _Tabs
