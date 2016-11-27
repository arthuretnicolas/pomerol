// @flow

import React from 'react'
import { Link } from 'react-router'

type Props = {
  children: Object,
  onPress: () => void,
  theme?: string,
  style?: Object,
  to?: string
}

const ButtonContainer = ({ to = '', children }) => {
  if (!to) {
    return children
  }

  return (
    <Link to={to}>
      {children}
    </Link>
  )
}

const Button = ({ theme = '', style, children, onPress, to = '' }: Props) => (
  <ButtonContainer to={to}>
    <button onPress={onPress} className={`Button ${theme}`}>
      {children}
    </button>
  </ButtonContainer>
)

export default Button
