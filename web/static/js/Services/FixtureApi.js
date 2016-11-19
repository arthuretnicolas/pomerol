// @flow

export default {
  getUser: (userId: string) => {
    const data = require('json-loader!../Fixtures/arthur.json')
    return {
      ok: true,
      data
    }
  }
}
