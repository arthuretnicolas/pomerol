// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Shared/Components/Modal'
import FormInvite from '../Forms/Components/FormInvite'
import OrganizationActions from '../../Reducers/OrganizationRedux'

type Props = {
  createOrganizationInviteAttempt: () => void,
  onRequestClose: () => void
}

type ValueProps = {
  email: string,
  role: string
}

class ModalInviteUser extends Component {
  props: Props

  _onSubmit = (values: ValueProps) => {
    const { createOrganizationInviteAttempt } = this.props
    const {
      email,
      role
    } = values

    createOrganizationInviteAttempt({
      email,
      role
    })
  }

  render () {
    const isVisible = true
    return (
      <Modal
        isVisible={isVisible}
        onClose={() => this.props.onRequestClose()}
      >
        <FormInvite onSubmit={this._onSubmit} />
      </Modal>
    )
  }
}

const mapStateToProps = ({ modal }) => ({
})

const mapDispatchToProps = dispatch => ({
  createOrganizationInviteAttempt: (organizationInvite: Object) => dispatch(OrganizationActions.createOrganizationInviteAttempt(organizationInvite))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalInviteUser)
