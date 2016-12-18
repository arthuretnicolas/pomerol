// @flow

import React from 'react'

type Props = {
  dimensions?: number,
  initials: string
}

function getColorClassName (initials: string = '') {
  const code =
    initials
      .slice(1, 2)
      .toLowerCase()
      .charCodeAt(0)

  if (code <= 'd'.charCodeAt(0)) {
    return 'color-1'
  }

  if (code <= 'g'.charCodeAt(0)) {
    return 'color-2'
  }

  if (code <= 'p'.charCodeAt(0)) {
    return 'color-3'
  }

  return 'color-4'
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
