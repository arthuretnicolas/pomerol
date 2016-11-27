// @flow

import React from 'react'
import { Link } from 'react-router'
import Button from '../Button'

const Navbar = () => (
  <div className='Landing-Navbar'>
    <div className='signup'>
      <Button to='signup' theme='success'>
        Sign up
      </Button>
    </div>

    <Link to='/login'>
      Login
    </Link>
  </div>
)

export default Navbar
