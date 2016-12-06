// @flow

import React from 'react'
import { Link } from 'react-router'

type Props = {
  children?: Object,
  onClick: () => void,
  theme?: string,
  style?: Object,
  to?: string,
  onClick?: () => void,
  disabled?: boolean,
  type?: string
}

const _onClick = (disabled, onClick) => {
  if (!disabled && typeof onClick === 'function') {
    onClick()
  }
}

const ButtonContainer = ({ to = '', children }) => {
  if (!to) {
    return children
  }

  return (
    <Link to={to} className='Button-no-decoration'>
      {children}
    </Link>
  )
}

const Button = ({ theme = '', style, children, onClick, to = '', type, disabled = false }: Props) => (
  <ButtonContainer to={to}>
    <button
      type={type || 'button'}
      onClick={() => _onClick(disabled, onClick)}
      className={`Button ${theme}`}
      disabled={disabled}
    >
      {children}
    </button>
  </ButtonContainer>
)

export default Button