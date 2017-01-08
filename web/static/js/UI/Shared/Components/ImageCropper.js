// @flow

import React from 'react'
import Input from '../../Forms/Components/Input'
import Button from './Button'
import ReactCrop from 'react-image-crop'

const crop = {
  x: 0,
  y: 0,
  width: 256,
  aspect: 1,
  minWidth: 96
}

const SaveOrCancel = ({ onCancel, onSave }) => (
  <div className='container-cta'>
    <Button
      onClick={onCancel}
      content='Cancel'
      theme='plain plain-danger'
      size='small'
    />

    <Button
      onClick={onSave}
      content='Save'
      theme='primary'
      size='small'
    />
  </div>
)

const Instructions = ({ onChange }) => (
  <div className='container-instructions'>
    <h3>
      Upload your photo
    </h3>

    <div>
      Photo should be at least 300px × 300px
    </div>

    <Input
      className='button'
      accept='image/*'
      type='file'
      required
      onChange={onChange}
      size='small'
    />
  </div>
)

type Props = {
  source: string,
  onChange: () => void,
  onSave: () => void,
  onCancel: () => void,
  isCropping: boolean
}
const ImageCropper = ({
  source = '',
  onChange,
  onSave,
  onCancel,
  isCropping
}: Props) => (
  <div className='Shared-ImageCropper'>
    <div className='container-photo'>
      {
        isCropping
          ? <ReactCrop
            crossorigin={null}
            crop={crop}
            src={source}
          />
          : <div
            className='container-photo'
            style={{
              backgroundImage: `url('${source}')`,
              backgroundSize: 'cover',
              height: '100%',
              width: '100%',
              backgroundPosition: 'center'
            }}
          />
        }
    </div>

    {
      isCropping
        ? <SaveOrCancel
          onSave={onSave}
          onCancel={onCancel}
        />
        : <Instructions
          onChange={onChange}
          isCropping={isCropping}
        />
    }
  </div>
)

export default ImageCropper
