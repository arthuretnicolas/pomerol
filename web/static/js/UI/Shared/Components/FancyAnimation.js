// @flow

import React, { Component } from 'react'
import { MorphReplace } from 'react-svg-morph'

const CHECK_DURATION = 1.5 * 1000

type Props = {
  isLoading: boolean
}

export default class FancyAnimation extends Component {
  state = {
    showSuccess: false
  }

  _timeoutId = null

  componentWillReceiveProps (nextProps: Props) {
    if (!nextProps.isLoadiing && this.props.isLoading) {
      this._handleSuccess()
    }
  }

  componentWillUnmount () {
    window.clearTimeout(this._timeoutId)
  }

  _updateSuccess = (bool: boolean) => {
    this.setState({
      showSuccess: bool
    })
  }

  _handleSuccess = () => {
    this._updateSuccess(true)

    this._timeoutId = window.setTimeout(
      () => this._updateSuccess(false),
      CHECK_DURATION
    )
  }

  render () {
    const { isLoading } = this.props
    const { showSuccess } = this.state

    if (!isLoading && !showSuccess) {
      return null
    }

    return (
      <div className='Shared-FancyAnimation'>
        <MorphReplace width={24} height={24}>
          {
            isLoading
              ? <IconLoading key='checked' />
              : <IconChecked key='checkbox' />
          }
        </MorphReplace>
      </div>
    )
  }
}

// stateless compoennts won't make it with the morph lib
class IconChecked extends Component {
  render () {
    return (
      <svg viewBox='0 0 24 24'>
        <path d='M7.197,16.963H7.195c-0.204,0-0.399-0.083-0.544-0.227l-6.039-6.082c-0.3-0.302-0.297-0.788,0.003-1.087C0.919,9.266,1.404,9.269,1.702,9.57l5.495,5.536L18.221,4.083c0.301-0.301,0.787-0.301,1.087,0c0.301,0.3,0.301,0.787,0,1.087L7.741,16.738C7.596,16.882,7.401,16.963,7.197,16.963z' />
      </svg>
    )
  }
}

class IconLoading extends Component {
  render () {
    return (
      <svg viewBox='0 0 24 24'>
        <path d='M3.936,7.979c-1.116,0-2.021,0.905-2.021,2.021s0.905,2.021,2.021,2.021S5.957,11.116,5.957,10S5.052,7.979,3.936,7.979z M3.936,11.011c-0.558,0-1.011-0.452-1.011-1.011s0.453-1.011,1.011-1.011S4.946,9.441,4.946,10S4.494,11.011,3.936,11.011z M16.064,7.979c-1.116,0-2.021,0.905-2.021,2.021s0.905,2.021,2.021,2.021s2.021-0.905,2.021-2.021S17.181,7.979,16.064,7.979z M16.064,11.011c-0.559,0-1.011-0.452-1.011-1.011s0.452-1.011,1.011-1.011S17.075,9.441,17.075,10S16.623,11.011,16.064,11.011z M10,7.979c-1.116,0-2.021,0.905-2.021,2.021S8.884,12.021,10,12.021s2.021-0.905,2.021-2.021S11.116,7.979,10,7.979z M10,11.011c-0.558,0-1.011-0.452-1.011-1.011S9.442,8.989,10,8.989S11.011,9.441,11.011,10S10.558,11.011,10,11.011z' />
      </svg>
    )
  }
}
