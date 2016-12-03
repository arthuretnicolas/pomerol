// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormLogin from '../Components/Forms/FormLogin'
import LoginActions from '../Reducers/LoginRedux'
// import NavigationBar from '../Components/NavigationBar'

type Props = {
  loginAttempt: () => void,
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

  render () {
    const { loginAttempt, attempting } = this.props
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
    dispatch(LoginActions.loginAttempt(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
