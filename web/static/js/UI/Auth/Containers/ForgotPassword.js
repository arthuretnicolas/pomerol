// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginActions from '../../../Reducers/LoginRedux'
import FormForgotPassword from '../../Forms/Components/FormForgotPassword'

type Props = {
  requestPasswordAttempt: () => void,
  attemptingRequest: boolean
}

type ValueProps = {
  email: string
}

class ForgotPassword extends Component {
  props: Props

  _onSubmit = (values: ValueProps) => {
    const { requestPasswordAttempt } = this.props
    const { email } = values

    requestPasswordAttempt(email)
  }

  render () {
    const { attemptingRequest } = this.props

    return (
      <div className='Auth-ForgotPassword'>
        <FormForgotPassword
          onSubmit={this._onSubmit}
          attempting={attemptingRequest}
          size='base'
        />
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
