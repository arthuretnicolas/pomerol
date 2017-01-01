// @flow

import React from 'react'

type Props = {
  dimensions?: number,
  firstName: string,
  lastName: string,
  className?: string,
  style?: Object
}

function getInitials (firstName, lastName) {
  const initials = `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`
  return initials
}

function getColorClassName (firstName, lastName) {
  const initials = getInitials(firstName, lastName)

  const code =
    initials
      .slice(0, 1)
      .toLowerCase()
      .charCodeAt(0)
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

const Avatar = ({
  dimensions = 40,
  firstName,
  lastName,
  className = '',
  style = {}
}: Props) => (
  <div className='Shared-Avatar'>
    <div
      className={`content ${className} ${getColorClassName(firstName, lastName)}`}
      style={{
        width: dimensions,
        height: dimensions,
        borderRadius: dimensions / 2
      }}
    >
      {getInitials(firstName, lastName)}
    </div>
  </div>
)

export default Avatar
