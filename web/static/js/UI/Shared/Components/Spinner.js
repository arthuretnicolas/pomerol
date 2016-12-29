// @flow

import React from 'react'

type Props = {
  style?: Object
}
const Spinner = ({ style }: Props) => (
  <div
    style={style}
    className='Shared-Spinner'
  >
    <div className='sk-spinner sk-spinner-pulse' />
  </div>
)

export default Spinner
