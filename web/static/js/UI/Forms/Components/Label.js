// @flow

import React from 'react'

type Props = {
  label: string,
  name: string
}
const Label = ({
  label,
  name
}: Props) => (
  <label htmlFor={name} className='Forms-Label'>
    {label}
  </label>
)

export default Label
