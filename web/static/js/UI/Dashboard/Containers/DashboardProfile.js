// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormUser from '../../Forms/Components/FormUser'
import FormPassword from '../../Forms/Components/FormPassword'
import Button from '../../Shared/Components/Button'
import LoginActions from '../../../Reducers/LoginRedux'

type Props = {
  user: Object,
  attemptingUpdateUser: boolean,
  updateUserAttempt: () => void
}

class DashboardProfile extends Component {
  props: Props

  state = {
    firstName: this.props.user.first_name,
    lastName: this.props.user.last_name,
    email: this.props.user.email,
    countryId: this.props.user.country_code,
    languageId: this.props.user.locale,
    password: '',
    newPassword1: '',
    newPassword2: ''
  }

  _onChange = (key: string, value: string) => {
    this.setState({
      [key]: value
    })
  }

  _onSubmitUser = () => {
    const { updateUserAttempt } = this.props
    const {
      firstName,
      lastName,
      email,
      countryId,
      languageId
    } = this.state

    updateUserAttempt({
      first_name: firstName,
      last_name: lastName,
      email,
      country_code: countryId,
      locale: languageId
    })
  }

  _onSubmitPassword = () => {
    console.log('_onSubmitPassword')

    const {
      password,
      newPassword1,
      newPassword2
    } = this.state

    if (password && newPassword1 === newPassword2) {
      // TODO: changePassword
    }
  }

  render () {
    const {
      attemptingUpdateUser
    } = this.props
    const {
      firstName,
      lastName,
      email,
      countryId,
      languageId,
      password,
      newPassword1,
      newPassword2
    } = this.state

    const passwordIsDisabled =
      !password ||
      !newPassword1 ||
      newPassword1 !== newPassword2

    return (
      <div className='Dashboard-DashboardProfile'>
        <div className='column'>
          <div className='title'>
            Profile photo
          </div>

          <div className='container-photo'>
            <img
              className='photo'
              width='96px'
              height='96px'
              src='https://storage.googleapis.com/material-design/publish/material_v_10/assets/0Bx4BSt6jniD7VG9DQVluOFJ4Tnc/materialdesign_principles_metaphor.png'
            />

            <div className='container-photo-instructions'>
              <h4>
                Upload your photo
              </h4>

              <div>
                Photo should be at least 300px × 300px
              </div>

              <Button
                className='button'
                content='Upload Photo'
                size='small'
                theme='primary'
              />
            </div>
          </div>
        </div>

        <div className='column'>
          <div className='title'>
            Basic information
          </div>

          <FormUser
            onChange={this._onChange}
            onSubmit={this._onSubmitUser}
            values={{ firstName, lastName, email, countryId, languageId }}
            attempting={attemptingUpdateUser}
          />
        </div>

        <div className='column last'>
          <div className='title'>
            Change password
          </div>

          <FormPassword
            onChange={this._onChange}
            onSubmit={this._onSubmitPassword}
            values={{ password, newPassword1, newPassword2 }}
            // attempting={attemptingOrganization}
            attempting={false}
            disabled={passwordIsDisabled}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({
  user: login.session && login.session.user,
  attemptingUpdateUser: login.attemptingUpdate
})

const mapDispatchToProps = dispatch => ({
  updateUserAttempt: (user: Object) => dispatch(LoginActions.updateUserAttempt(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProfile)
