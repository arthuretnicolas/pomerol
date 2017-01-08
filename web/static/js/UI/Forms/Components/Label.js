// @flow

import React from 'react'

type Props = {
  label: string,
  name: string,
  className?: string
}
const Label = ({
  label,
  name,
  className = ''
}: Props) => (
  <label
    htmlFor={name}
    className={`Forms-Label ${className}`}
  >
    {label}
  </label>
)

export default Label
