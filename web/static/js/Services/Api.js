// @flow

import apisauce from 'apisauce'

const isDev = process.env.NODE_ENV === 'development'
const url = isDev ? 'http://localhost:4000/api/v1/' : 'https://pomerol-dev.herokuapp.com/api/v1'

const create = (baseURL: string = url) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    timeout: 10 * 1000
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

  const loginWithGoogle = (code: string) =>
    api.post('auth/google/callback', {
      code
    })

  const signup = (email: string, password: string) =>
    api.post('signup', {
      email,
      password
    })

  const requestPassword = (email: string) =>
    api.post('password/request', {
      email
    })

  const resetPassword = (token: string, password: string) =>
    api.post('password/reset', {
      token,
      password
    })

  const updatePassword = (jwt: string, password: string, newPassword: string) =>
    api.put('account/password', {
      old_password: password,
      new_password: newPassword
    }, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })

  const fetchSession = (jwt: string) =>
    api.get('user', {}, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })

  const updateUser = (jwt: string, userId: string, user: Object) =>
    api.put(`users/${userId}`, user, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })

  const getUser = (name: string) => api.get(`users/${name}`)

  const createOrganization = (jwt: string, organization: Object) =>
    api.post('organizations', organization, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })

  const updateOrganization = (jwt: string, organizationId: string, organization: Object) =>
    api.put(`organizations/${organizationId}`, organization, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })

  const fetchOrganization = (jwt: string, organizationId: string) =>
    api.get(`organizations/${organizationId}`, {}, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })

  const createOrganizationInvite = (jwt: string, organizationId: string, organizationInvite: Object) =>
    api.post(`organizations/${organizationId}/invites`, organizationInvite, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })

  const naviMonitor = response => console.log('%cAPI response', 'background-color: purple; color: white; font-weight: 500; padding: 5px', response)
  if (isDev) {
    api.addMonitor(naviMonitor)
  }

  return {
    getUser,
    login,
    loginWithGoogle,
    signup,
    fetchSession,
    requestPassword,
    resetPassword,
    updatePassword,
    updateUser,
    createOrganization,
    updateOrganization,
    fetchOrganization,
    createOrganizationInvite
  }
}

export default {
  create
}
