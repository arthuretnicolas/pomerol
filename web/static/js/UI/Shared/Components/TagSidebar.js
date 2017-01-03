// @flow

import React from 'react'

type Props = {
  data: Array<string>,
  selected: string,
  onClick: string => void
}

const TagSidebar = ({ data, selected, onClick }: Props) => (
  <div className='Shared-TagSidebar'>
    {
      [ 'All' ]
        .concat(
          data.sort((opt1, opt2) => opt1.localeCompare(opt2))
        )
        .map((option, index) => (
          <div
            key={index}
            className={`option ${selected === option ? 'option-selected' : ''}`}
            onClick={() => onClick(option)}
          >
            {option}
          </div>
        ))
    }
  </div>
)

export default TagSidebar
