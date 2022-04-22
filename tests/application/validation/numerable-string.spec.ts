import { NumerableStringValidator } from '@/application/validation'
import { NotValidCharactersError } from '@/application/errors'

describe('NumerableStringValidator', () => {
  it('should return NotValidCharactersError if string has alphabetic characters', () => {
    const sut = new NumerableStringValidator('not_valid_vatNumber', 'vatNumber')

    const error = sut.validate()

    expect(error).toEqual(new NotValidCharactersError('vatNumber', 'numbers'))
  })
  it('should return empty if string is not too short', () => {
    const sut = new NumerableStringValidator('00000000000', 'vatNumber')

    const error = sut.validate()

    expect(error).toEqual(undefined)
  })
})
