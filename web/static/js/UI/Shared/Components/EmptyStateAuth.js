// @flow
import React from 'react'

const EmptyStateAuth = () => (
  <div className='Shared-EmptyStateAuth'>
    <div className='form-container'>
      <h1 className='header'>
        Login
      </h1>

      <div>
        Need a Pomerol account? <span className='primary'>Create an account</span>
      </div>

      <div className='input'>Your email</div>
      <div className='input'>Your password</div>
    </div>
  </div>
)

export default EmptyStateAuth
