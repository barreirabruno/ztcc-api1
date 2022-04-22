import { TooShortStringError } from '@/application/errors'
import { MinLengthStringValidator } from '@/application/validation'

describe('MinLengthStringValidator', () => {
  it('should return TooShortStringError if string has 2 characters', () => {
    const sut = new MinLengthStringValidator('00', 'vatNumber')

    const error = sut.validate()

    expect(error).toEqual(new TooShortStringError('vatNumber'))
  })

  it('should return empty if string is not too short', () => {
    const sut = new MinLengthStringValidator('00000000000', 'vatNumber')

    const error = sut.validate()

    expect(error).toEqual(undefined)
  })
})
