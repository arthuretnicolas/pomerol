// @flow

import React from 'react'

type Props = {
  dimensions?: number,
  initials: string
}

const arrayCodes =
  [ 'd', 'g', 'p' ]
    .map(letter => letter.charCodeAt(0))

  for (let c of arrayCodes) {
    if (code <= c) {
      return `color-${arrayCodes.indexOf(c)}`
    }
  }

  return ''
}

const Avatar = ({ dimensions = 45, initials }: Props) => (
  <div className='Shared-Avatar'>
    <div
      className={`content ${getColorClassName(initials)}`}
      style={{
        width: dimensions,
        height: dimensions,
        borderRadius: dimensions / 2
      }}
    >
      {initials}
    </div>
  </div>
)

export default Avatar
