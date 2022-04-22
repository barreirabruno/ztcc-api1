import { NumerableStringValidator, MinLengthStringValidator, MaxLengthStringValidator, RequiredStringValidator, Validator } from '@/application/validation'

export class ValidationBuilder {
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

  numerable (): ValidationBuilder {
    this.validators.push(new NumerableStringValidator(this.value, this.fieldName))
    return this
  }

  vatNumberMinLength (): ValidationBuilder {
    this.validators.push(new MinLengthStringValidator(this.value, this.fieldName))
    return this
  }

  vatNumberMaxLength (): ValidationBuilder {
    this.validators.push(new MaxLengthStringValidator(this.value, this.fieldName))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
