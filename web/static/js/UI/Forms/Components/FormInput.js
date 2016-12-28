// @flow

import React from 'react'

type Props = {
  type?: string,
  disabled?: bool,
  name?: string,
  placeholder?: string,
  required?: bool,
  onChange?: () => void,
  minLength?: number,
  value?: any
}

const FormInput = ({
  type,
  disabled,
  name,
  placeholder,
  required,
  minLength,
  onChange,
  value
}: Props) => (
  <div className='Forms-FormInput'>
    <input
      className='input'
      type={type}
      disabled={disabled}
      name={name}
      required={required}
      minLength={minLength}
      placeholder={placeholder}
      onChange={(onChange)}
      value={value}
    />
  </div>
)

export default FormInput
