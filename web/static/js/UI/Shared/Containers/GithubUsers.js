// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import GithubActions from '../../../Reducers/GithubRedux'
import NavigationBar from '../Components/NavigationBar'
import GithubUser from '../Components/GithubUser'

type Props = {
  fetchUser: () => null,
  github: Object
}

class GithubUsers extends Component {
  props: Props

  static defaultProps = {
    counter: 0
  }

  state = {
    name: ''
  }

  _onChange = (event: Object) => {
    const name = event.target.value
    this.setState({ name })
  }

  _onSubmit = event => {
    event.preventDefault()
    const { fetchUser } = this.props
    const { name } = this.state

    fetchUser(name)
    this.setState({ name: '' })
  }

  render () {
    const { github } = this.props
    const { users, ids } = github
    const { name } = this.state

    return (
      <div>
        <NavigationBar />

        <h1>
          Github Users
        </h1>

        <form onSubmit={this._onSubmit}>
          <input
            type='text'
            value={name}
            onChange={this._onChange}
          />

          <button type='submit'>
            Fetch user
          </button>
        </form>

        <div style={{ marginTop: 30 }}>
          {
            // slice prevents reverse from mutating ids
            ids.asMutable().slice().reverse().map((id: string) => {
              const user = users[id]
              const year = (new Date(user.created_at)).getFullYear()

              return (
                <GithubUser
                  key={id}
                  name={user.name}
                  url={user.avatar_url}
                  year={year}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ github }) => ({
  github
})

const mapDispatchToProps = dispatch => ({
  fetchUser: (name: string) => dispatch(GithubActions.fetchUserRequest(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(GithubUsers)
