export class TooLongStringError extends Error {
  constructor (fieldName: string) {
    super(`The field ${fieldName} is too long`)
  }
}
