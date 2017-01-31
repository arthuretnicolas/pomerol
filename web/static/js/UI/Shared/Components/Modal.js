// @flow

import React from 'react'
import ReactModal from 'react-modal'

type Props = {
  isOpen?: boolean,
  onRequestClose: () => void
}

const ModalOLD = ({ isOpen, onRequestClose, children }: Props) => (
  <ReactModal
    isOpen={isOpen}
    // onAfterOpen={afterOpenFn}
    onRequestClose={onRequestClose}
    // closeTimeoutMS={n}
    // style={customStyle}
    contentLabel='Modal'
  >
    {children}
  </ReactModal>
)

export default ModalOLD
