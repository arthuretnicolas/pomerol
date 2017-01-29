// @flow

import React from 'react'
import Button from '../../Shared/Components/Button'
import Icon from '../../Shared/Components/Icon'
import FancyAnimation from '../../Shared/Components/FancyAnimation'

type Props = {
  name: string,
  callToAction?: {
    name: string,
    onClick: () => void
  },
  tabs?: React.Element<*>,
  isLoading?: boolean
}

const Header = ({
  name,
  callToAction,
  tabs,
  isLoading = false
}: Props) => (
  <div className='Dashboard-Header'>
    <div className='container-left'>
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

    <div className='container-animation'>
      <FancyAnimation isLoading={isLoading} />
    </div>
  </div>
)

export default Header
