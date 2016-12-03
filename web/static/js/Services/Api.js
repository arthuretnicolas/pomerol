// @flow

import apisauce from 'apisauce'

const isDev = process.env.NODE_ENV === 'development'

const create = (baseURL: string = 'http://localhost:4000/api/v1/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    timeout: 10000
  })

  // Force API Key on all requests
  // api.addRequestTransform((request) => {
  //   request.params['APPID'] = '0e44183e8d1018fc92eb3307d885379c'
  // })

  const login = (email: string, password: string) =>
    api.post('signin', {
      email,
      password
    })

  const getUser = (name: string) => api.get(`users/${name}`)

  const naviMonitor = response => console.log('%cAPI response', 'background-color: purple; color: white; font-weight: 500; padding: 5px', response)
  if (isDev) {
    api.addMonitor(naviMonitor)
  }

  return {
    getUser,
    login
  }
}

export default {
  create
}
