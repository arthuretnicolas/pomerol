// @flow

import React from 'react'
import Icon from './Icon'
import Link from './Link'

const Field = ({ field }) => {
  const {
    label,
    link,
    onClick
  } = field

  if (onClick) {
    return (
      <div
        className='item-label pointer'
        onClick={onClick}
      >
        {label}
      </div>
    )
  }

  if (link) {
    const linkIsQuote = link.startsWith('/quotes')
    if (linkIsQuote) {
      return (
        <Link
          className='item-label pointer'
          noBorder
          to={link}
        >
          {label}
        </Link>
      )
    }

    const linkIsEmail = link.includes('mailto:')
    return (
      <a
        href={link}
        target={linkIsEmail ? '' : '_blank'}
        rel='nofollow'
        className='item-label pointer'
      >
        {label}
      </a>
    )
  }

  return (
    <div
      className='item-label'
    >
      {label}
    </div>
  )
}

type Props = {
  label: string,
  fields: Array<{
    iconName: string,
    label: string,
    link?: string,
    onClick?: () => void
  }>
}
const Infos = ({
  label,
  fields
}: Props) => (
  <div className='Shared-Infos'>
    <div className='label'>
      {label}
    </div>

    {
      fields.map((field, index) => (
        <div
          key={index}
          className='container-item'
        >
          <Icon
            name={field.iconName}
            className='primary'
          />

          <Field field={field} />
        </div>
      ))
    }
  </div>
)

export default Infos
