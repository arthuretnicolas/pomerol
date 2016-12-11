// @flow

import React from 'react'

type Props = {
  data: Array<{
    id: number,
    label: string
  }>,
  selected: number | string,
  onClick: number => void
}

type optionAllType = {
  id: number,
  label: string
}

const optionAll: optionAllType = {
  id: -1,
  label: 'All'
}

const TagSidebar = ({ data, selected, onClick }: Props) => (
  <div className='Shared-TagSidebar'>
    {
      data
        .concat(optionAll)
        .sort((opt1, opt2) => opt1.id - opt2.id)
        .map((option, index) => (
          <div
            className={`option ${selected === option.id ? 'option-selected' : ''}`}
            onClick={() => onClick(option.id)}
          >
            {option.label}
          </div>
        ))
    }
  </div>
)

export default TagSidebar
