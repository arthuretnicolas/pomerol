// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormLogin from '../../Forms/Components/FormLogin'
import LoginActions from '../../../Reducers/LoginRedux'
import GoogleLogin from 'react-google-login'

type Props = {
  loginAttempt: () => void,
  loginWithGoogleSuccess: () => void,
  loginWithGoogleFailure: () => void,
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

  _loginWithGoogleSuccess = response =>
    this.props.loginWithGoogleSuccess(response.accessToken, response.profileObj)

  _loginWithGoogleFailure = error =>
    this.props.loginWithGoogleFailure(error)

  render () {
    const {
      loginAttempt,
      attempting
    } = this.props
    const { email, password } = this.state

    return (
      <div className='Login'>
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
            onSuccess={this._loginWithGoogleSuccess}
            onFailure={this._loginWithGoogleFailure}
            className='googleButton'
          />
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
  loginWithGoogleSuccess: (jwt: string, profileObj: Object) =>
    dispatch(LoginActions.loginWithGoogleSuccess(jwt, profileObj)),
  loginWithGoogleFailure: (error: Object) =>
    dispatch(LoginActions.failure(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
