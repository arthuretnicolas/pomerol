// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from '../../Shared/Components/Link'
import FormLogin from '../../Forms/Components/FormLogin'
import Button from '../../Shared/Components/Button'
import LoginActions from '../../../Reducers/LoginRedux'
import GoogleLogin from 'react-google-login'

type Props = {
  loginAttempt: () => void,
  preloginWithGoogleSuccess: () => void,
  preloginWithGoogleFailure: () => void,
  attempting: boolean,
  attemptingGoogle: boolean
}

class Login extends Component {
  props: Props

  _preloginWithGoogleSuccess = response =>
    this.props.preloginWithGoogleSuccess(response.code)

  _preloginWithGoogleFailure = error =>
    this.props.preloginWithGoogleFailure(error)

  _onSubmit = values => {
    const { loginAttempt } = this.props
    const {
      email,
      password
    } = values

    loginAttempt(email, password)
  }

  render () {
    const {
      attemptingGoogle,
      attempting
    } = this.props

    return (
      <div className='Auth-Login'>
        <div className='form-container'>
          <FormLogin
            onSubmit={this._onSubmit}
            attempting={attempting}
            size='base'
          />

          <Button
            type='submit'
            content={(
              <GoogleLogin
                tag='span'
                clientId='217330109544-l6gh6agp436gc77i6gqje4t3ni6lluj6.apps.googleusercontent.com'
                buttonText='Login with Google'
                onSuccess={this._preloginWithGoogleSuccess}
                onFailure={this._preloginWithGoogleFailure}
                className='google-button'
                offline
              >
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                  height='24px'
                  width='24px'
                  className='logo-google'
                />
                Login with Google
              </GoogleLogin>
            )}
            theme='secondary'
            disabled={attemptingGoogle}
            loading={attemptingGoogle}
            contentLoading={(
              <div>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                  height='24px'
                  width='24px'
                  className='logo-google'
                />
                Logging with Google...
              </div>
            )}
            className='container-google-button'
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
  attempting: login.attempting,
  attemptingGoogle: login.attemptingGoogle
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
