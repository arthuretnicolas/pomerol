import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'

const REDUX_PERSIST = {
  active: true,
  storeConfig: {
    blacklist: [ '' ],
    transforms: [ immutablePersistenceTransform ]
  }
}

export default REDUX_PERSIST
