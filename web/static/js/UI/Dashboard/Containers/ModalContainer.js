// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
// import ModalActions from '../../../Reducers/ModalRedux'
// import OrganizationActions from '../../../Reducers/OrganizationRedux'
// import Modal from '../../Shared/Components/Modal'
// import FormInvite from '../../Forms/Components/FormInvite'
import ModalEditMembership from '../../Modals/ModalEditMembership'
import ModalInviteUser from '../../Modals/ModalInviteUser'

const MODAL_COMPONENTS = {
  'INVITE_USER': ModalInviteUser,
  'EDIT_MEMBERSHIP': ModalEditMembership
}

type Props = {
  modalType: string,
  modalProps: Object
  // isOpen: boolean,
  // hideModal: () => void,
  // createOrganizationInviteAttempt: () => void
}

// type ValueProps = {
//   email: string,
//   role: string
// }

class ModalContainer extends Component {
  props: Props

  // _onSubmit = (values: ValueProps) => {
  //   const { createOrganizationInviteAttempt } = this.props
  //   const {
  //     email,
  //     role
  //   } = values
  //
  //   createOrganizationInviteAttempt({
  //     email,
  //     role
  //   })
  // }

  render () {
    const { modalType, modalProps } = this.props

    if (!modalType) {
      return null
    }

    const SpecificModal = MODAL_COMPONENTS[modalType]
    return <SpecificModal {...modalProps} />
    // return (

      // <Modal
      //   isOpen={this.props.isOpen}
      //   onRequestClose={() => this.props.hideModal()}
      // >
      //   <FormInvite
      //     onSubmit={this._onSubmit}
      //     attempting={false}
      //     size='base'
      //   />
      // </Modal>
    // )
  }
}

const mapStateToProps = ({ modal }) => ({
  modalType: modal.modalType,
  modalProps: modal.modalProps
})

const mapDispatchToProps = dispatch => ({
  // hideModal: () => dispatch(ModalActions.hideModal()),
  // createOrganizationInviteAttempt: (organizationInvite: Object) => dispatch(OrganizationActions.createOrganizationInviteAttempt(organizationInvite))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer)
