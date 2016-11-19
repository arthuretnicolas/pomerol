const isDev = process.env.NODE_ENV === 'development'

// process STARTUP actions
export function * startup (action) {
  if (isDev) {
    console.info('startup')
  }
}
