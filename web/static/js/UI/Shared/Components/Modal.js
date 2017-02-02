// @flow

import React from 'react'
import ReactModal from 'react-modal'

type Props = {
  isVisible?: boolean,
  style?: Object,
  children?: React<*>,
  onClose: () => void,
}
const Modal = ({ style, children, onClose, isVisible }: Props) => (
  <ReactModal
    isOpen={isVisible}
    style={style}
    onRequestClose={onClose}
    contentLabel='Modal'
  >
    {children}
  </ReactModal>
)

export default Modal
