import { MaxLengthStringValidator } from '@/application/validation'
import { TooLongStringError } from '@/application/errors'

describe('MaxLengthStringValidator', () => {
  it('should return TooLongStringError if string has 12 characters', () => {
    const sut = new MaxLengthStringValidator('00000000000000000000', 'vatNumber')

    const error = sut.validate()

    expect(error).toEqual(new TooLongStringError('vatNumber'))
  })

  it('should return empty if string is not too short', () => {
    const sut = new MaxLengthStringValidator('00000000000', 'vatNumber')

    const error = sut.validate()

    expect(error).toEqual(undefined)
  })
})
