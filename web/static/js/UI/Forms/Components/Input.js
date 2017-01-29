// @flow

import React from 'react'
import Label from './Label'
import { shouldShowError } from '../../../Helpers'

type Props = {
  label?: string,
  type?: string,
  disabled?: bool,
  name?: string,
  placeholder?: string,
  required?: bool,
  onChange?: () => void,
  minLength?: number,
  value?: any,
  size?: 'small' | 'base' | 'large',
  src?: any,
  accept?: string,
  meta?: {
    touched: boolean,
    error: string,
    warning: string,
    active: boolean,
    visited: boolean
  },
  onFocus?: () => void,
  onBlur?: () => void
}

const Input = ({
  label,
  type,
  disabled,
  name = Math.random().toFixed(10),
  placeholder,
  required,
  minLength,
  onChange,
  value,
  size = 'base',
  src = '',
  accept = '',
  meta,
  onFocus = () => undefined,
  onBlur = () => undefined
}: Props) => (
  <div className={`Forms-Input ${size} ${type === 'file' ? 'file' : ''}`}>
    {
      !!label && <Label
        name={name}
        label={label}
        className={type === 'file' ? 'label-file' : ''}
        required={required}
        meta={meta}
      />
    }

    <input
      id={name}
      className={`
        input
        ${shouldShowError(meta) && meta && meta.error ? 'error' : ''}
        ${shouldShowError(meta) && meta && meta.warning ? 'warning' : ''}
      `}
      type={type}
      disabled={disabled}
      required={required}
      minLength={minLength}
      placeholder={placeholder}
      onChange={(onChange)}
      value={value}
      src={src}
      accept={accept}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  </div>
)

export default Input
