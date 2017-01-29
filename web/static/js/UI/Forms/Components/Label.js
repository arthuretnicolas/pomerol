// @flow

import React from 'react'
import { shouldShowError } from '../../../Helpers'

const ErrorOrWarning = ({ meta }) => {
  if (!(shouldShowError(meta))) {
    return null
  }

  const {
    error,
    warning
  } = meta

  return (
    <span
      className={`
        error-or-warning
        ${error ? 'error' : 'warning'}
      `}
    >
      {error || warning}
    </span>
  )
}

type Props = {
  label: string,
  name: string,
  className?: string,
  required?: boolean,
  meta?: {
    touched: boolean,
    error: string,
    warning: string,
    active: boolean,
    visited: boolean
  }
}
const Label = ({
  label,
  name,
  className = '',
  required = false,
  meta
}: Props) => (
  <label
    htmlFor={name}
    className={`
      Forms-Label
      ${className}
    `}
  >
    <span>
      {label}
      {required && <span className='required-star'>*</span>}
    </span>

    {
      meta && <ErrorOrWarning
        meta={meta}
      />
    }
  </label>
)

export default Label
