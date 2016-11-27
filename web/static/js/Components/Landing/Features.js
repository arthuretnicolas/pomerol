// @flow

import React from 'react'
import { Link } from 'react-router'

const data = [
  {
    title: 'Features',
    text: 'Our tools empower you to grow your business in a way only you can.',
    linkText: 'Explore Features',
    linkTo: '/features'
  },
  {
    title: 'Pricing',
    text: 'Start sending emails today for free. Then level up as you grow.',
    linkText: 'View Pricing',
    linkTo: '/pricing'
  },
  {
    title: 'E-Commerce',
    text: 'Recapture sales, recommend products, and make money in your sleep.',
    linkText: 'Connect Your Store',
    linkTo: '/connect'
  }
]

const Features = () => (
  <div className='Landing-Features'>
    {
      data.map((item, index) => (
        <div className='feature' key={index}>
          <h2 className='title'>
            {item.title}
          </h2>

          <div className='text'>
            {item.text}
          </div>

          <Link to={item.linkTo}>
            {item.linkText}
          </Link>
        </div>
      ))
    }
  </div>
)

export default Features
