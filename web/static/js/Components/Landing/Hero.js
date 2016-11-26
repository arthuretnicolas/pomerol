// @flow

import React from 'react'
import Navbar from './Navbar'

const Hero = () => (
  <div className='Landing-Hero root'>
    <Navbar />

    <div className='masthead'>
      <h1 className='title'>
        Better quotes make all the difference
      </h1>

      <p className='value-proposition'>
        Join more than 14 million people who use Pomerol to grow their businesses on their terms.
      </p>

      <button>
        Sign Up Free
      </button>
    </div>
  </div>
)

export default Hero
