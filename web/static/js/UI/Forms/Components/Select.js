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
      <svg
        viewBox='0 0 18 18'
        style={{
          fill: '#333',
          height: 16,
          width: 16
        }}>
        <path d='M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z' />
      </svg>
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
