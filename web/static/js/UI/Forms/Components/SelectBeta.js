// @flow

import React from 'react'
import Label from './Label'

import { getSelectContent } from '../../../Helpers'

type Props = {
  label?: string,
  required?: bool,
  name?: string,
  theme?: 'plain',
  size?: 'small' | 'base' | 'large',
  children?: React.Element<any>,
  placeholder?: string,
  options: Array<{
    id: string,
    name: string
  }>,
  top: Array<string>
}

const Select = ({
  label,
  string,
  required,
  name = Math.random().toFixed(10),
  theme = '',
  size = 'base',
  children,
  placeholder,
  options,
  top
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
      !!label && <Label
        name={name}
        label={label}
        required={required}
      />
    }
    {
      // $FlowFixMe
      React.cloneElement(children, {
        children: getSelectContent(placeholder, options, top)
      })
    }
  </div>
)

export default Select
