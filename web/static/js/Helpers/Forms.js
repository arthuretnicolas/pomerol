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
  if (!meta || typeof meta.active === 'undefined') {
    return false
  }

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
  },
  top: Array<string>,
  options: Array<{
    id: string,
    name: string
  }>,
  size?: 'small' | 'base' | 'large'
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
  meta,
  size
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
          size={size}
        />
      )
    default:
      return null
  }
}

export function getSelectContent (
  placeholder: string,
  options: Array<{
    id: string,
    name: string
  }>,
  top: Array<string> = []
) {
  const selectPlaceholder = (
    <option key='placeholder' value='' disabled>
      {placeholder}
    </option>
  )

  const getSelectOptions = (options, top, isTop: boolean) =>
    options
      .filter(opt => top.includes(opt.id) === isTop)
      .map(opt => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))

  const selectSeparator =
    top.length
      ? <option key='separator' disabled>──────────</option>
      : null

  const selectContent =
    [ selectPlaceholder ]
      .concat(getSelectOptions(options, top, true))
      .concat(selectSeparator)
      .concat(getSelectOptions(options, top, false))

  return selectContent
}
