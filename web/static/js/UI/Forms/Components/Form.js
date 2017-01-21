// @flow

import React from 'react'
import Button from '../../Shared/Components/Button'
import Link from '../../Shared/Components/Link'

type Props = {
  header?: string,
  text?: {
    label: string,
    linkLabel?: string,
    to?: string // TODO: declare that linkLabel and to should be present or not at the same time
  },
  children: React.Element<any>,
  buttonSubmit: string,
  attempting: boolean,
  alternativeCta?: React.Element<any>,
  fullWidthCta?: boolean,
  contentLoading?: string | React.Element<*>,
  buttonSize?: 'small' | 'base' | 'large',
  disabled?: boolean
}

const Form = ({
  header,
  text,
  buttonSubmit,
  children,
  attempting,
  alternativeCta,
  fullWidthCta,
  contentLoading,
  buttonSize,
  disabled = false
}: Props) => (
  <div className='Forms-Form'>
    {
      header && <h1 className='header'>
        {header}
      </h1>
    }

    {
      text && <div className='subheader'>
        {text.label}&nbsp;
        {
          !!text.linkLabel && !!text.to && <Link to={text.to} className='link-label'>
            {text.linkLabel}
          </Link>
        }
      </div>
    }

    <div className='container-input'>
      {children}
    </div>

    <div className='container-cta'>
      <Button
        type='submit'
        size={buttonSize}
        content={buttonSubmit}
        theme='primary'
        disabled={attempting || disabled}
        loading={attempting}
        contentLoading={contentLoading}
        fullWidth={fullWidthCta}
      />

      {
        alternativeCta && <div className='container-alternative-cta'>
          {alternativeCta}
        </div>
      }
    </div>
  </div>
)

export default Form
