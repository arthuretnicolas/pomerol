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
  top?: Array<*>
}

const Select = ({
  disabled,
  placeholder,
  required,
  onChange,
  options,
  selected,
  top = top || []
}: Props) => (
  <div className='Forms-Select'>
    <div className='arrow-down'>
      &#x25BC;
    </div>

    <select
      className={`select ${placeholder && !selected ? 'showing-placeholder' : ''}`}
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={selected || 'value_placeholder'}
    >
      {
        placeholder && <option value='value_placeholder' disabled>
          {placeholder}
        </option>
      }

      {
        options
          .filter(opt => top.includes(opt.id))
          .map(opt => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))
      }

      {
        top &&
        top.length &&
        options.filter(opt => !top.includes(opt.id)).length &&
        <option disabled>──────────</option>
      }

      {
        options
          .filter(opt => !top.includes(opt.id))
          .map(opt => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))
      }
    </select>
  </div>
)

export default Select
