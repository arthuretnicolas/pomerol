// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from '../../Shared/Components/Link'
import FormLogin from '../../Forms/Components/FormLogin'
import LoginActions from '../../../Reducers/LoginRedux'
import GoogleLogin from 'react-google-login'

type Props = {
  loginAttempt: () => void,
  preloginWithGoogleSuccess: () => void,
  preloginWithGoogleFailure: () => void,
  attempting: boolean
}

class Login extends Component {
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

  _preloginWithGoogleSuccess = response =>
    this.props.preloginWithGoogleSuccess(response.code)

  _preloginWithGoogleFailure = error =>
    this.props.preloginWithGoogleFailure(error)

  render () {
    const {
      loginAttempt,
      attempting
    } = this.props
    const { email, password } = this.state

    return (
      <div className='Auth-Login'>
        <div className='form-container'>
          <FormLogin
            onChange={this._onChange}
            onSubmit={() => loginAttempt(email, password)}
            values={{
              email,
              password
            }}
            attempting={attempting}
          />

          <GoogleLogin
            clientId='217330109544-l6gh6agp436gc77i6gqje4t3ni6lluj6.apps.googleusercontent.com'
            buttonText='Login with Google'
            onSuccess={this._preloginWithGoogleSuccess}
            onFailure={this._preloginWithGoogleFailure}
            className='googleButton'
            offline
          />

          <div className='container-forgot'>
            <Link to='/forgot-password'>
              Forgot password?
            </Link>
          </div>
        </div>

        <div className='illustration'>
          <div className='image-container' />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({
  attempting: login.attempting
})

const mapDispatchToProps = dispatch => ({
  loginAttempt: (email: string, password: string) =>
    dispatch(LoginActions.loginAttempt(email, password)),
  preloginWithGoogleSuccess: (code: string) =>
    dispatch(LoginActions.preloginWithGoogleSuccess(code)),
  preloginWithGoogleFailure: (error: Object) =>
    dispatch(LoginActions.failure(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
