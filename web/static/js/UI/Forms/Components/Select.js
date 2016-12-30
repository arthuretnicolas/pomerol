// @flow

import React from 'react'

type Props = {
  type?: string,
  disabled?: bool,
  placeholder?: string,
  required?: bool,
  onChange?: () => void,
  options: Array<{
    id: number,
    name: string
  }>,
  selected?: number | null,
  top?: Array<number> | Array<string> | null
}

const Select = ({
  disabled,
  placeholder,
  required,
  onChange,
  options,
  selected,
  top
}: Props) => (
  <div className='Forms-Select'>
    <select
      className='select'
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={selected || 'value_placeholder'}
    >
      <optgroup label='suckers'>
        {
          placeholder && <option value='value_placeholder' disabled>
            {placeholder}
          </option>
        }

        {
          !!options && options.map(opt => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))
        }
      </optgroup>
    </select>
  </div>
)

export default Select
