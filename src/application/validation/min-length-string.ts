import { TooShortStringError } from '../errors'

export class MinLengthStringValidator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string) {}

  validate (): Error | undefined {
    const regex = /[0-9]{3,}/
    const minLengthRegex = new RegExp(regex)
    const executeRegex = minLengthRegex.test(this.value)
    if (!executeRegex) {
      return new TooShortStringError(this.fieldName)
    }
    return undefined
  }
}
