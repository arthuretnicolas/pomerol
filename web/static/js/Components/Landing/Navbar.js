// @flow

import React from 'react'
import { Link } from 'react-router'

const Navbar = () => (
  <div className='Landing-Navbar'>
    <button className='signup'>
      Sign up
    </button>

    <Link to='/login'>
      Login
    </Link>
  </div>
)

export default Navbar
