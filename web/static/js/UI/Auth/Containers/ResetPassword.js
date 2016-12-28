// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginActions from '../../../Reducers/LoginRedux'
import FormResetPassword from '../../Forms/Components/FormResetPassword'

type Props = {
  resetPasswordAttempt: () => void,
  params: {
    token: string
  },
  attemptingReset: boolean
}

class ResetPassword extends Component {
  props: Props

  state = {
    password: ''
  }

  _onChange = (key, value: string) => {
    this.setState({
      [key]: value
    })
  }

  _resetPassword = () => {
    const { resetPasswordAttempt } = this.props
    const { token } = this.props.params
    const { password } = this.state
    console.log(password, token)

    resetPasswordAttempt(token, password)
  }

  render () {
    const { attemptingReset } = this.props
    const { password } = this.state

    return (
      <div className='Auth-ResetPassword'>
        <div className='form-container'>
          <FormResetPassword
            onChange={this._onChange}
            onSubmit={this._resetPassword}
            values={{ password }}
            attempting={attemptingReset}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({
  attemptingReset: login.attemptingReset
})

const mapDispatchToProps = dispatch => ({
  resetPasswordAttempt: (token: string, password: string) => dispatch(LoginActions.resetPasswordAttempt(token, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
