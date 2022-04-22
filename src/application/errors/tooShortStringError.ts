export class TooShortStringError extends Error {
  constructor (fieldName: string) {
    super(`The field ${fieldName} is too short`)
  }
}
