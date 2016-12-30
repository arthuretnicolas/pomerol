// @flow

import React from 'react'
import Button from '../../Shared/Components/Button'

const Footer = () => (
  <div className='Landing-Footer'>
    <div className='container'>
      <div className='container-text'>
        <div className='header'>
          Ready to try Pomerol?
        </div>

        <div className='value-proposition'>
          No obligations, no credit card required.
        </div>
      </div>

      <div className='container-button'>
        <Button
          theme='primary'
          size='small'
          to='signup'
          content='Try Pomerol for free'
        />
      </div>
    </div>
  </div>
)

export default Footer
