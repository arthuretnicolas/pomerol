import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'

const REDUX_PERSIST = {
  active: true,
  storeConfig: {
    blacklist: [
      'startup',
      'onboarding',
      'organizations',
      'form'
    ],
    transforms: [ immutablePersistenceTransform ]
  }
}

export default REDUX_PERSIST
