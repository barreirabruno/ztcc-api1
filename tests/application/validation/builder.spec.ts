import { RequiredStringValidator, ValidationBuilder } from '@/application/validation/'

describe('ValidationBuilder', () => {
  it('should return a RequiredString validator', () => {
    const validators = ValidationBuilder.of({
      value: '', fieldName: 'any_field_name'
    }).required().build()

    expect(validators).toEqual([
      new RequiredStringValidator('', 'any_field_name')
    ])
  })
})
