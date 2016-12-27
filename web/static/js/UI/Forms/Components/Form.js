// @flow

import React from 'react'
import Button from '../../Shared/Components/Button'
import Link from '../../Shared/Components/Link'

type Props = {
  header?: string,
  text?: string,
  text?: {
    label: string,
    linkLabel?: string,
    to?: string // TODO: declare that linkLabel and to should be present or not at the same time
  },
  children: React.Element<any>,
  buttonSubmit: string,
  attempting: boolean,
  alternativeCta?: React.Element<any>
}

const Form = ({
  header,
  text,
  buttonSubmit,
  children,
  attempting,
  alternativeCta
}: Props) => (
  <div className='Forms-Form'>
    {
      header && <h1 className='header'>
        {header}
      </h1>
    }

    {
      text && <div>
        {text.label}&nbsp;
        {
          !!text.linkLabel && !!text.to && <Link to={text.to}>
            {text.linkLabel}
          </Link>
        }
      </div>
    }

    <div className='container-input'>
      {children}
    </div>

    <div className='container-cta'>
      <Button type='submit' disabled={attempting}>
        {buttonSubmit}
      </Button>

      {
        alternativeCta && <div className='container-alternative-cta'>
          {alternativeCta}
        </div>
      }
    </div>
  </div>
)

export default Form
