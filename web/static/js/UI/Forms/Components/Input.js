// @flow

import React from 'react'
import Label from './Label'

type Props = {
  label?: string,
  type?: string,
  disabled?: bool,
  name?: string,
  placeholder?: string,
  required?: bool,
  onChange?: () => void,
  minLength?: number,
  value?: any,
  size?: 'small' | 'base' | 'large',
  src?: any,
  accept?: string
}

const Input = ({
  label,
  type,
  disabled,
  name = Math.random().toFixed(10),
  placeholder,
  required,
  minLength,
  onChange,
  value,
  size = '',
  src = '',
  accept = ''
}: Props) => (
  <div className={`Forms-Input ${size} ${type === 'file' ? 'file' : ''}`}>
    {
      !!label && <Label name={name} label={label} />
    }

    <input
      name={name}
      className='input'
      type={type}
      disabled={disabled}
      required={required}
      minLength={minLength}
      placeholder={placeholder}
      onChange={(onChange)}
      value={value}
      src={src}
      accept={accept}
    />
  </div>
)

export default Input
