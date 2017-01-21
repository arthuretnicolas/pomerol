// @flow

import React from 'react'
import { Link as ReactRouterLink } from 'react-router'
import { omit } from 'ramda'

const Link = (props: Object) => (
  <ReactRouterLink
    {...omit([ 'noBorder' ], props)}
    className={`
      Shared-Link
      ${props.noBorder ? 'no-border' : ''}
      ${props.className || ''}
    `}
  />
)

export default Link
