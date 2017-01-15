// @flow

import React from 'react'
import Button from '../../Shared/Components/Button'
import Icon from '../../Shared/Components/Icon'

type Props = {
  name: string,
  callToAction?: {
    name: string,
    onClick: () => void
  },
  tabs?: React.Element<*>
}

const Header = ({
  name,
  callToAction,
  tabs
}: Props) => (
  <div className='Dashboard-Header'>
    <div className='title'>
      {name}
    </div>

    { tabs }

    {
      callToAction && <Button
        className='button'
        content={(
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon
              name='plus'
              className='success'
            />

            <span style={{
              paddingLeft: 8
            }}>
              Add a contact
            </span>
          </div>
        )}
        onClick={callToAction.onClick}
        size='small'
        theme='plain plain-success'
      />
    }
  </div>
)

export default Header
