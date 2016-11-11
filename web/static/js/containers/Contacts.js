// @flow

import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import CounterActions from '../reducers/CounterRedux'

type Props = {
  dispatch: () => any,
  increment: () => null,
  counter: { value: number }
}

class Main extends Component {
  props: Props

  static defaultProps = {
    counter: 0
  }

  render () {
    const { counter, increment } = this.props

    return (
      <div>
        <div style={{ marginBottom: 15 }}>
          <Link to='/'>Go home</Link>
        </div>

        <h1>Contacts: {counter.value}</h1>
        <button onClick={() => increment(1)}>+</button>
        <button onClick={() => increment(-1)}>-</button>
      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
  counter
})

const mapDispatchToProps = dispatch => ({
  increment: amount => dispatch(CounterActions.counterIncrement(amount))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
