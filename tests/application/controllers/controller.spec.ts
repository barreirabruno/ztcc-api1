import { InternalServerError, ServerError } from '@/domain/models/errors'
import { Controller } from '@/application/controllers'
import { ValidationComposite } from '@/application/validation'
import { mocked } from 'jest-mock'
import { HttpResponse } from '../helpers'

jest.mock('@/application/validation/composite')

class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: 200,
    data: 'any_data'
  }

  async perform (httpRequest: any): Promise<HttpResponse> {
    return this.result
  }
}

describe('Controller', () => {
  let sut: ControllerStub

  beforeEach(() => {
    sut = new ControllerStub()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 400 if validation fails', async () => {
    const error = new Error('Validation Error')
    const validationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    mocked(ValidationComposite).mockImplementationOnce(validationCompositeSpy)

    const httpResponse = await sut.handle({
      first_name: 'any_user_name',
      last_name: 'any_last_user_name',
      vatNumber: ''
    })

    expect(ValidationComposite).toHaveBeenCalledWith([])
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should return 500 if perform method fail', async () => {
    const error = new ServerError(new InternalServerError())
    jest.spyOn(sut, 'perform').mockResolvedValueOnce({
      statusCode: 500,
      data: error
    })
    const httpResponse = await sut.handle({
      first_name: 'any_user_name',
      last_name: 'any_last_user_name',
      vatNumber: 'any_valid_vatNumber'
    })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(new InternalServerError())
    })
  })

  it('should return 500 if perform method fail for any reason', async () => {
    const error = new ServerError(new Error('ANY_INFRA_ERROR'))
    jest.spyOn(sut, 'perform').mockResolvedValueOnce({
      statusCode: 500,
      data: error
    })

    const httpResponse = await sut.handle({
      first_name: 'any_user_name',
      last_name: 'any_last_user_name',
      vatNumber: 'any_valid_vatNumber'
    })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(new Error('ANY_INFRA_ERROR'))
    })
  })

  it('should return same result as perform', async () => {
    const httpResponse = await sut.handle({
      first_name: 'any_user_name',
      last_name: 'any_last_user_name',
      vatNumber: 'any_valid_vatNumber'
    })

    expect(httpResponse).toEqual(sut.result)
  })
})
