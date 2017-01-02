// @flow

import React, { Element } from 'react'

type Props = {
  children?: Array<Element<any>>
}

const Grid = ({
  children
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
          `}
        >
          {child}
        </div>
      ))
    }
  </div>
)

export default Grid
