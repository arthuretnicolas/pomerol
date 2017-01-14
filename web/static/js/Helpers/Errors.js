function getError (error: string | Object): string {
  if (typeof error === 'string') {
    return error
  }

  const errorString = error.detail || error.email

  return errorString
}

function parseErrors (errors: Object | Array): string {
  if (Array.isArray(errors)) {
    const parsedErrors =
      errors.map(getError)
        .join(' ')

    return parsedErrors
  }

  if (typeof errors === 'object') {
    const firstKey = Object.keys(errors)[0]

    return errors[firstKey] || ''
  }

  return ''
}

export function handleErrors (data: Object): void {
  // will happen for timeout errors for example
  if (!data) {
    return undefined
  }

  const parsedErrors = parseErrors(data.errors || data.error || [])

  if (parsedErrors !== '') {
    // TODO use modals instead
    // http://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions/35641680
    alert(parsedErrors) // eslint-disable-line
  }
}
