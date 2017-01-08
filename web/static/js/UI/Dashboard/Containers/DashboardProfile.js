// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormUser from '../../Forms/Components/FormUser'
import FormPassword from '../../Forms/Components/FormPassword'
import ImageCropper from '../../Shared/Components/ImageCropper'
import LoginActions from '../../../Reducers/LoginRedux'

const DEFAULT_PHOTO = 'http://www.animaux-cie.com/images/header/girafe.jpg'
const IMAGE_MIN_SIZE = 300

type Props = {
  user: Object,
  attemptingUpdateUser: boolean,
  attemptingUpdatePassword: boolean,
  updateUserAttempt: () => void,
  updatePasswordAttempt: () => void
}

class DashboardProfile extends Component {
  props: Props

  state = {
    firstName: this.props.user.first_name,
    lastName: this.props.user.last_name,
    email: this.props.user.email,
    countryId: this.props.user.country,
    languageId: this.props.user.locale,
    password: '',
    newPassword1: '',
    newPassword2: '',
    photo: this.props.user.photo_large_url || DEFAULT_PHOTO,
    isCropping: false
  }

  _image = new window.Image()

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
    const { updatePasswordAttempt } = this.props

    const {
      password,
      newPassword1,
      newPassword2
    } = this.state

    if (password && newPassword1 === newPassword2) {
      updatePasswordAttempt(password, newPassword1)
    }
  }

  _onChangePhoto = event => {
    const file = event && event.target.files[0]

    this._image.onload = () => {
      const isValid =
        this._image.naturalWidth >= IMAGE_MIN_SIZE &&
        this._image.naturalHeight >= IMAGE_MIN_SIZE

      if (isValid) {
        this.setState({
          photo: this._image.src,
          isCropping: true
        })
      } else {
        window.alert('Photo should be at least 300px × 300px')
      }
    }

    this._image.src = window.URL.createObjectURL(file)
  }

  _onSavePicture = () => {
    console.log('_onSavePicture')
  }

  _onCancelPicture = () => {
    this.setState({
      photo: this.props.user.photo_large_url || DEFAULT_PHOTO,
      isCropping: false
    })
  }

  render () {
    const {
      attemptingUpdateUser,
      attemptingUpdatePassword
    } = this.props
    const {
      firstName,
      lastName,
      email,
      countryId,
      languageId,
      password,
      newPassword1,
      newPassword2,
      photo,
      isCropping
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

          <ImageCropper
            source={photo}
            onChange={this._onChangePhoto}
            isCropping={isCropping}
            onSave={this._onSavePicture}
            onCancel={this._onCancelPicture}
            imageMinSize={IMAGE_MIN_SIZE}
          />
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
            attempting={attemptingUpdatePassword}
            disabled={passwordIsDisabled}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({
  user: login.session && login.session.user,
  attemptingUpdateUser: login.attemptingUpdate,
  attemptingUpdatePassword: login.attemptingUpdatePassword
})

const mapDispatchToProps = dispatch => ({
  updateUserAttempt: (user: Object) =>
    dispatch(LoginActions.updateUserAttempt(user)),
  updatePasswordAttempt: (password: string, newPassword: string) =>
    dispatch(LoginActions.updatePasswordAttempt(password, newPassword))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProfile)
