// @flow

import React from 'react'
import { Link } from 'react-router'
import Spinner from './Spinner'

type Props = {
  text: string,
  textLoading?: string,
  onClick: () => void,
  theme?: string,
  style?: Object,
  to?: string,
  onClick?: () => void,
  disabled?: boolean,
  loading?: boolean,
  type?: string,
  fullWidth?: boolean,
  size?: 'small' | 'normal' | 'large'
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

const Button = ({
  theme = '',
  style,
  text,
  textLoading = '',
  onClick,
  to = '',
  type,
  disabled = false,
  loading = false,
  fullWidth,
  size
}: Props) => (
  <ButtonContainer to={to}>
    <button
      type={type || 'button'}
      onClick={() => _onClick(disabled, onClick)}
      className={`
        Button ${theme}
        ${fullWidth ? 'full-width' : ''}
        ${size || ''}
      `}
      disabled={disabled}
    >
      {
        loading && <Spinner style={{
          display: 'flex',
          alignItems: 'center',
          height: 16,
          paddingRight: 8
        }} />
      }

      <div className='container-text'>
        {
          loading && textLoading
            ? textLoading
            : text
        }
      </div>
    </button>
  </ButtonContainer>
)

export default Button
