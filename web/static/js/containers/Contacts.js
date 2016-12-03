// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import CounterActions from '../Reducers/CounterRedux'
import NavigationBar from '../Components/NavigationBar'

type Props = {
  dispatch: () => any,
  increment: () => null,
  attemptIncrement: () => null,
  counter: { value: number, attempting?: boolean }
}

class Contacts extends Component {
  props: Props

  static defaultProps = {
    counter: {
      value: 0,
      attempting: false
    }
  }

  render () {
    const {
      counter,
      increment,
      attemptIncrement
    } = this.props

    const {
      value,
      attempting
    } = counter

    return (
      <div>
        <NavigationBar />

        <h1>
          Contacts: {attempting ? '...' : value}
        </h1>

        <div>
          <h2>Without delay</h2>
          <button onClick={() => increment(1)}>+</button>
          <button onClick={() => increment(-1)}>-</button>
        </div>

        <div>
          <h2>With delay</h2>
          <button disabled={attempting} onClick={() => attemptIncrement(1)}>+</button>
          <button disabled={attempting} onClick={() => attemptIncrement(-1)}>-</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
  counter
})

const mapDispatchToProps = dispatch => ({
  increment: amount => dispatch(CounterActions.increment(amount)),
  attemptIncrement: amount => dispatch(CounterActions.attemptIncrement(amount))
})

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)
