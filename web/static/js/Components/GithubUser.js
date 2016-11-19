// @flow

import React from 'react'

type Props = {
  name?: string,
  url: string,
  year: number
}

const GithubUser = ({ url, name, year }: Props) => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }}>
    <div>
      <img
        src={url}
        style={{
          width: 50,
          height: 50
        }}
      />
    </div>

    <div style={{ marginLeft: 15 }}>
      {name || 'No name'}
    </div>

    <div>
      &nbsp;({year})
    </div>
  </div>
)

export default GithubUser
