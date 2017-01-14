// @flow

import React from 'react'

type Props = {
  label: string,
  name: string,
  className?: string,
  required?: boolean
}
const Label = ({
  label,
  name,
  className = '',
  required = false
}: Props) => (
  <label
    htmlFor={name}
    className={`
      Forms-Label
      ${className}
    `}
  >
    {label}
    {
      required && <span className='required-star'>
        *
      </span>
    }
  </label>
)

export default Label
