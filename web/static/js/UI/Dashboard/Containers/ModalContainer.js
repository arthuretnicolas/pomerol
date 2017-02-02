// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModalActions from '../../../Reducers/ModalRedux'
import ModalInviteUser from '../../Modals/ModalInviteUser'
import ModalEditMembership from '../../Modals/ModalEditMembership'

const MODAL_COMPONENTS = {
  'INVITE_USER': ModalInviteUser,
  'EDIT_MEMBERSHIP': ModalEditMembership
}

type Props = {
  modalType: string,
  modalProps: Object
}

class ModalContainer extends Component {
  props: Props

  render () {
    const { modalType, modalProps } = this.props

    if (!modalType) {
      return (null)
    }

    const SpecificModal = MODAL_COMPONENTS[modalType]
    return (
      <SpecificModal
        onRequestClose={() => this.props.triggerModal(modalType, false, {})}
        {...modalProps}
      />
    )
  }
}

const mapStateToProps = ({ modal }) => ({
  modalType: modal.modalType,
  modalProps: modal.modalProps
})

const mapDispatchToProps = dispatch => ({
  triggerModal: (modalType: string, isVisible: boolean, modalProps: Object) =>
    dispatch(ModalActions.triggerModal(modalType, isVisible, modalProps))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer)
