// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginActions from '../../../Reducers/LoginRedux'
import FormForgotPassword from '../../Forms/Components/FormForgotPassword'

type Props = {
  requestPasswordAttempt: () => void,
  attemptingRequest: boolean
}

class ForgotPassword extends Component {
  props: Props

  state = {
    email: ''
  }

  _onChange = (key, value: string) => {
    this.setState({
      [key]: value
    })
  }

  _requestPassword = () => {
    const { requestPasswordAttempt } = this.props
    const { email } = this.state

    requestPasswordAttempt(email)
  }

  render () {
    const { attemptingRequest } = this.props
    const { email } = this.state

    return (
      <div className='Auth-ForgotPassword'>
        <div className='form-container'>
          <FormForgotPassword
            onChange={this._onChange}
            onSubmit={this._requestPassword}
            values={{ email }}
            attempting={attemptingRequest}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({
  attemptingRequest: login.attemptingRequest
})

const mapDispatchToProps = dispatch => ({
  requestPasswordAttempt: (email: string) =>
    dispatch(LoginActions.requestPasswordAttempt(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
