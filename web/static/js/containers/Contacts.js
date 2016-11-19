// @flow

import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import CounterActions from '../Reducers/CounterRedux'

type Props = {
  dispatch: () => any,
  increment: () => null,
  attemptIncrement: () => null,
  counter: { value: number, attempting?: boolean }
}

class Main extends Component {
  props: Props

  static defaultProps = {
    counter: 0
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
        <div style={{ marginBottom: 15 }}>
          <Link to='/'>Go home</Link>
        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Main)
