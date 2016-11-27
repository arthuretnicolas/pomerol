// @flow

import React from 'react'
import Button from '../Button'

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
        <Button theme='primary large' to='signup'>
          Try Pomerol for free
        </Button>
      </div>
    </div>
  </div>
)

export default Footer
