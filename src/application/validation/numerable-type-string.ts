import { NotValidCharactersError } from '../errors'

export class NumerableStringValidator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string) {}

  validate (): Error | undefined {
    const regex = /[0-9]/
    const minLengthRegex = new RegExp(regex)
    const executeRegex = minLengthRegex.test(this.value)
    if (!executeRegex) {
      return new NotValidCharactersError(this.fieldName, 'numbers')
    }
    return undefined
  }
}
