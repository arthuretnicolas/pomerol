// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormSignup from '../../Forms/Components/FormSignup'
import SignupActions from '../../../Reducers/SignupRedux'

type Props = {
  signupAttempt: () => void,
  attempting: boolean
}

type ValueProps = {
  email: string,
  password: string
}

class Signup extends Component {
  props: Props

  _onSubmit = (values: ValueProps) => {
    const { signupAttempt } = this.props
    const {
      email,
      password
    } = values

    signupAttempt(email, password)
  }

  render () {
    const { attempting } = this.props

    return (
      <div className='Auth-Signup'>
        <FormSignup
          onSubmit={this._onSubmit}
          attempting={attempting}
          size='base'
        />
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
