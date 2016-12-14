// @flow

import React from 'react'
import Button from '../Button'
import { Link } from 'react-router'

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
  attempting: boolean
}

const Form = ({ header, text, buttonSubmit, children, attempting }: Props) => (
  <div className='Forms-Form'>
    {
      header && <h1>
        {header}
      </h1>
    }

    {
      text && <div>
        {text.label}
        {
          !!text.linkLabel && !!text.to && <Link to={text.to}>
            {text.linkLabel}
          </Link>
        }
      </div>
    }

    <div className='input-container'>
      {children}
    </div>

    <Button type='submit' disabled={attempting}>
      {buttonSubmit}
    </Button>
  </div>
)

export default Form
