// @flow

import React from 'react'
import ReactModal from 'react-modal'
import Icon from './Icon'

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
    <div onClick={onClose}>
      <Icon
        className='icon-close'
        name='close'
      />
    </div>

    {children}
  </ReactModal>
)

export default Modal
