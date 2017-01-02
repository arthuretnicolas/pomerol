// @flow

import React from 'react'

type Props = {
  style?: Object,
  children?: React<*>
}
const Spinner = ({ style, children }: Props) => (
  <div
    style={style}
    className='Shared-Spinner'
  >
    <div className='sk-spinner sk-spinner-pulse' />

    {children}
  </div>
)

export default Spinner
