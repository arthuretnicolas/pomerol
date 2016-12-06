// @flow

import React from 'react'
import Navbar from './Navbar'
import Button from '../../Shared/Components/Button'
import { Link } from 'react-router'

const Hero = () => (
  <div className='Landing-Hero'>
    <Navbar />

    <div className='masthead'>
      <h1 className='title'>
        Better quotes make all the difference
      </h1>

      <p className='value-proposition'>
        Join more than 14 million people who use Pomerol to grow their businesses on their terms.
      </p>

      <Button to='/signup' theme='large primary'>
        Sign Up Free
      </Button>

      <div className='more'>
        Want to learn more? <Link to='/features'>Check out our features</Link>
      </div>
    </div>
  </div>
)

export default Hero
