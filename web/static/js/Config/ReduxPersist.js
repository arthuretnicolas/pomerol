import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'

const REDUX_PERSIST = {
  active: true,
  storeConfig: {
    whitelist: [ 'counter' ],
    transforms: [ immutablePersistenceTransform ]
  }
}

export default REDUX_PERSIST
