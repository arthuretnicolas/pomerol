// @flow

import React from 'react'
import Label from './Label'

type Props = {
  label?: string,
  type?: string,
  disabled?: bool,
  placeholder?: string,
  required?: bool,
  onChange?: () => void,
  options: Array<{
    id: string,
    name: string
  }>,
  selected?: string | null,
  top?: Array<*>,
  name?: string,
  theme?: 'plain',
  maxWidthSelect?: number,
  size?: 'small' | 'base' | 'large'
}

const Select = ({
  label,
  string,
  disabled,
  placeholder,
  required,
  onChange,
  name = Math.random().toFixed(10),
  options,
  selected,
  top = top || [],
  theme = '',
  maxWidthSelect,
  size = ''
}: Props) => (
  <div className={`Forms-Select ${theme} ${size}`}>
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

    {
      !!label && <Label name={name} label={label} />
    }

    <select
      style={{
        maxWidth: maxWidthSelect
      }}
      name={name}
      className={`select ${placeholder && !selected ? 'showing-placeholder' : ''}`}
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={selected || ''}
    >
      {
        placeholder && <option value='' disabled>
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
