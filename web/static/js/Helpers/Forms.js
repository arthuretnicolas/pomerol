// @flow

import React from 'react'
import Input from '../UI/Forms/Components/Input'

type MetaType = {
  touched: boolean,
  error: string,
  warning: string,
  active: boolean,
  visited: boolean
}

export function shouldShowError (meta: MetaType): boolean {
  const {
    active,
    error,
    warning,
    visited
  } = meta

  const _shouldShowError =
    visited &&
    !active &&
    !!(error || warning)

  return _shouldShowError
}

type TypeRenderField = {
  input: {
    checked : boolean,
    name : string,
    onBlur: () => void,
    onChange: () => void,
    onDragStart: () => void,
    onDrop: () => void,
    onFocus: () => void,
    value: any
  },
  fieldType: 'input' | 'textearea' | 'select',
  required?: boolean,
  label?: string,
  placeholder?: string,
  disabled?: boolean,
  attempting?: boolean,
  type: string,
  meta?: {
    touched: boolean,
    error: string,
    warning: string,
    active: boolean,
    visited: boolean
  }
}

export const renderField = ({
  input,
  fieldType,
  required,
  label,
  placeholder,
  disabled,
  attempting,
  type,
  meta
}: TypeRenderField) => {
  switch (fieldType) {
    case 'input':
      return (
        <Input
          {...input}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          attempting={attempting}
          type={type}
          meta={meta}
          onFocus={input.onFocus}
          onBlur={input.onBlur}
          required={required}
        />
      )
    default:
      return null
  }
}
