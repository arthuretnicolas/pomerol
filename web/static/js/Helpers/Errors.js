// @flow

type ErrorType = {
  detail: string,
  id: string,
  status: number,
  title: string
}

function parseErrors (errors: Array<ErrorType>): string {
  const parsedErrors =
    errors.map(err => err.detail)
      .join(' ')

  return parsedErrors
}

export function handleErrors (errors: Array<ErrorType>): void {
  const parsedErrors = parseErrors(errors)

  if (parsedErrors !== '') {
    // TODO use modals instead
    // http://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions/35641680
    alert(parsedErrors) // eslint-disable-line
  }
}