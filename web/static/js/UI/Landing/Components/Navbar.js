// @flow

import React from 'react'
import Link from '../../Shared/Components/Link'
import Button from '../../Shared/Components/Button'

const Navbar = () => (
  <div className='Landing-Navbar'>
    <div className='signup'>
      <Button to='signup' theme='primary'>
        Sign up
      </Button>
    </div>

    <Link
      to='/login'
      noBorder
    >
      Login
    </Link>
  </div>
)

export default Navbar
