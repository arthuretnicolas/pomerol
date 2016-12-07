// @flow

import React from 'react'

type Props = {
  type?: string,
  disabled?: bool,
  name?: string,
  placeholder?: string,
  required?: bool,
  onChange?: () => void,
  value?: any
}

const FormInput = ({ type, disabled, name, placeholder, required, onChange, value }: Props) => (
  <div className='Forms-FormInput'>
    <input
      className='input'
      type={type}
      disabled={disabled}
      name={name}
      placeholder={placeholder}
      onChange={(onChange)}
      value={value}
    />
  </div>
)

export default FormInput
