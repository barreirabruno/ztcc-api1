class TooShortStringError extends Error {
  constructor (fieldName: string) {
    super(`The field ${fieldName} is too short`)
  }
}

class MinLengthStringValidator {
  constructor (
    private readonly minLengthValue: number,
    private readonly value: string,
    private readonly fieldName: string) {}

  validate (): Error | undefined {
    const rule = '/[0-9]{3,}/'
    const minLengthRegex = new RegExp(rule)
    const executeRegex = this.value.match(minLengthRegex)
    if (executeRegex == null) {
      return new TooShortStringError(this.fieldName)
    }
    return undefined
  }
}

describe('MinLengthStringValidator', () => {
  it('should return TooShortStringError if string has 2 characters', () => {
    const sut = new MinLengthStringValidator(3, '00', 'vatNumber')

    const error = sut.validate()

    expect(error).toEqual(new TooShortStringError('vatNumber'))
  })
  it('should return empty if string is not too short', () => {

  })
})
