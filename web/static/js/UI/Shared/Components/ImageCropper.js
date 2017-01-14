// @flow

import React from 'react'
import Input from '../../Forms/Components/Input'
import Button from './Button'
import ReactCrop from 'react-image-crop'

const crop = {
  x: 0,
  y: 0,
  width: 256,
  aspect: 1
}

const isDev = process.env.NODE_ENV === 'development'

const onComplete = (crop, pixelCrop) => {
  if (isDev) {
    console.log('crop:', crop, ' - pixelCrop:', pixelCrop)
  }
}

const SaveOrCancel = ({ onCancel, onSave, isAttempting }) => (
  <div className='container-cta'>
    <Button
      onClick={onCancel}
      content='Cancel'
      theme='plain plain-danger'
      size='small'
      disabled={isAttempting}
    />

    <Button
      onClick={onSave}
      loading={isAttempting}
      content='Save'
      contentLoading='Saving'
      theme='primary'
      size='small'
    />
  </div>
)

const Instructions = ({ onChange, imageMinSize }) => (
  <div className='container-instructions'>
    {
      imageMinSize && imageMinSize > 0 && <div>
        Photo should be at least {imageMinSize}px × {imageMinSize}px
      </div>
    }

    <Input
      label='Upload photo'
      className='button'
      accept='image/*'
      type='file'
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
  isCropping: boolean,
  isAttempting: boolean,
  imageMinSize?: number
}
const ImageCropper = ({
  source = '',
  onChange,
  onSave,
  onCancel,
  isCropping,
  imageMinSize,
  isAttempting
}: Props) => (
  <div className='Shared-ImageCropper'>
    <div
      className='container-photo'
      style={{
        backgroundColor: isCropping ? '#111' : '#f9fafb'
      }}
    >
      {
        isCropping
          ? <ReactCrop
            crossorigin={null}
            crop={crop}
            src={source}
            minWidth={25 / 100 * 256}
            maxWidth={256}
            maxHeight={256}
            onComplete={onComplete}
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
          isAttempting={isAttempting}
        />
        : <Instructions
          onChange={onChange}
          isCropping={isCropping}
          imageMinSize={imageMinSize}
        />
    }
  </div>
)

export default ImageCropper
