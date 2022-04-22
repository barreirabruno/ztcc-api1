import { TooLongStringError } from '../errors'

export class MaxLengthStringValidator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string) {}

  validate (): Error | undefined {
    const regex = /^[0-9]{11}$/
    const minLengthRegex = new RegExp(regex)
    const executeRegex = minLengthRegex.test(this.value)
    if (!executeRegex) {
      return new TooLongStringError(this.fieldName)
    }
    return undefined
  }
}
