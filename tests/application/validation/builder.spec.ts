import { RequiredStringValidator, Validator } from '@/application/validation/'

class ValidationBuilder {
  private constructor (
    private readonly value: string,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (params: { value: string, fieldName: string}): ValidationBuilder {
    return new ValidationBuilder(params.value, params.fieldName)
  }

  required (): ValidationBuilder {
    this.validators.push(new RequiredStringValidator(this.value, this.fieldName))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}

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
