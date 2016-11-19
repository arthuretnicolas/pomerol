// @flow

import apisauce from 'apisauce'

const create = (baseURL: string = 'https://api.github.com/') => {
  const api = apisauce.create({
    baseURL,
    headers: { 'Accept': 'application/vnd.github.v3+json' },
    timeout: 10000
  })

  // Force API Key on all requests
  // api.addRequestTransform((request) => {
  //   request.params['APPID'] = '0e44183e8d1018fc92eb3307d885379c'
  // })

  const getUser = (name: string) => api.post('users', { name })

  const naviMonitor = response => console.log('hey!  listen! ', response)
  api.addMonitor(naviMonitor)

  return {
    getUser
  }
}

export default {
  create
}
