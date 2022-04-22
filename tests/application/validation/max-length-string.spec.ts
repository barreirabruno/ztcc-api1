export class TooLongStringError extends Error {
  constructor (fieldName: string) {
    super(`The field ${fieldName} is too long`)
  }
}

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

describe('MaxLengthStringValidator', () => {
  it('should return TooLongStringError if string has 12 characters', () => {
    const sut = new MaxLengthStringValidator('00000000000000000000', 'vatNumber')

    const error = sut.validate()

    expect(error).toEqual(new TooLongStringError('vatNumber'))
  })
})
