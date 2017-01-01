// @flow

import React from 'react'
import Label from './Label'

type Props = {
  label: string,
  name?: string,
  type?: string,
  disabled?: bool,
  name?: string,
  placeholder?: string,
  required?: bool,
  onChange?: () => void,
  minLength?: number,
  value?: any,
  rows?: number
}

const Textarea = ({
  label,
  type,
  disabled,
  name = Math.random().toFixed(10),
  placeholder,
  required,
  minLength,
  onChange,
  value,
  rows = 3
}: Props) => (
  <div className='Forms-Textarea'>
    <Label name={name} label={label} />

    <textarea
      className='textarea'
      type={type}
      disabled={disabled}
      name={name}
      rows={rows}
      required={required}
      minLength={minLength}
      placeholder={placeholder}
      onChange={(onChange)}
      value={value}
    />
  </div>
)

export default Textarea
