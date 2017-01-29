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

type ValueProps = {
  password: string
}

class ResetPassword extends Component {
  props: Props

  _onSubmit = (values: ValueProps) => {
    const { resetPasswordAttempt, params } = this.props
    const { password } = values

    resetPasswordAttempt(params.token, password)
  }

  render () {
    const { attemptingReset } = this.props

    return (
      <div className='Auth-ResetPassword'>
        <FormResetPassword
          onSubmit={this._onSubmit}
          attempting={attemptingReset}
          size='base'
        />
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
