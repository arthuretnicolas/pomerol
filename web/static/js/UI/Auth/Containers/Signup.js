// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormSignup from '../../Forms/Components/FormSignup'
import SignupActions from '../../../Reducers/SignupRedux'

type Props = {
  signupAttempt: () => void,
  attempting: boolean
}

class Signup extends Component {
  props: Props

  state = {
    email: '',
    password: ''
  }

  _onChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  render () {
    const { signupAttempt, attempting } = this.props
    const { email, password } = this.state

    return (
      <div className='Auth-Signup'>
        <div className='form-container'>
          <FormSignup
            onChange={this._onChange}
            onSubmit={() => signupAttempt(email, password)}
            values={{
              email,
              password
            }}
            attempting={attempting}
          />
        </div>

        <div className='illustration'>
          <div className='image-container' />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ signup }) => ({
  attempting: signup.attempting
})

const mapDispatchToProps = dispatch => ({
  signupAttempt: (email: string, password: string) =>
    dispatch(SignupActions.signupAttempt(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
