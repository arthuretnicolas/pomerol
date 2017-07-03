// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Shared/Components/Modal'

type Props = {
  onRequestClose: () => void
}

class ModalEditMembership extends Component {
  props: Props

  render () {
    const isVisible = true
    return (
      <Modal
        isVisible={isVisible}
        onClose={() => this.props.onRequestClose()}
      >
        <div>Edit membership</div>
      </Modal>
    )
  }
}

const mapStateToProps = ({ modal }) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditMembership)
