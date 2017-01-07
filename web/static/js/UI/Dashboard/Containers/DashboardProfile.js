// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormUser from '../../Forms/Components/FormUser'
import FormPassword from '../../Forms/Components/FormPassword'
import Button from '../../Shared/Components/Button'

type Props = {
  user: Object
}

class DashboardProfile extends Component {
  props: Props

  state = {
    firstName: this.props.user.first_name,
    lastName: this.props.user.last_name,
    email: this.props.user.email,
    password: '',
    newPassword1: '',
    newPassword2: ''
  }

  _onChangeUser = user => console.log(user)
  _onSubmitUser = user => console.log(user)

  _onChangePassword = user => console.log(user)
  _onSubmitPassword = user => console.log(user)

  render () {
    const {
      firstName,
      lastName,
      email,
      password,
      newPassword1,
      newPassword2
    } = this.state

    return (
      <div className='Dashboard-DashboardProfile'>
        <div className='column'>
          <div className='label'>
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
              />
            </div>
          </div>
        </div>

        <div className='column'>
          <div className='label'>
            Basic information
          </div>

          <FormUser
            onChange={this._onChangeUser}
            onSubmit={this._onSubmitUser}
            values={{ firstName, lastName, email }}
            // attempting={attemptingOrganization}
            attempting={false}
          />
        </div>

        <div className='column'>
          <div className='label'>
            Change password
          </div>

          <FormPassword
            onChange={this._onChangePassword}
            onSubmit={this._onSubmitPassword}
            values={{ password, newPassword1, newPassword2 }}
            // attempting={attemptingOrganization}
            attempting={false}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({
  user: login.session && login.session.user
})

const mapDispatchToProps = dispatch => ({
  // logout: () => dispatch(LoginActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProfile)
