// @flow

import React, { Element } from 'react'

type Props = {
  children?: Array<Element<any>>,
    padding?: 'small' | 'base' | 'large'
}

const Grid = ({
  children,
  padding = 'small'
}: Props) => (
  <div className='Shared-Grid'>
    {
      children && children.map((child, index) => (
        <div
          key={index}
          className={`
            child
            ${index === 0 ? 'first' : ''}
            ${index === (children || []).length - 1 ? 'last' : ''}
            ${padding}
          `}
        >
          {child}
        </div>
      ))
    }
  </div>
)

export default Grid
