import { TransactionAccountInterface } from '@/domain/features/'
import { InternalServerError, ServerError } from '@/domain/models/errors'
import { TransactionController } from '@/application/controllers'
import { RequiredStringValidator } from '@/application/validation'
import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'jest-mock'

jest.mock('@/application/validation/required-string')

describe('TransactionAccountController', () => {
  let sut: TransactionController
  let transactionAccountService: MockProxy<TransactionAccountInterface>

  beforeAll(() => {
    transactionAccountService = mock()
    transactionAccountService.perform.mockResolvedValue({
      id: 'any_valid_id',
      first_name: 'any_user_name',
      last_name: 'any_last_user_name',
      vatNumber: 'any_valid_vatNumber'
    })
  })

  beforeEach(() => {
    sut = new TransactionController(transactionAccountService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 400 if validation fails', async () => {
    const error = new Error('Validation Error')
    const requiredStringValidatorSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    mocked(RequiredStringValidator).mockImplementationOnce(requiredStringValidatorSpy)

    const httpResponse = await sut.handle({
      first_name: 'any_user_name',
      last_name: 'any_last_user_name',
      vatNumber: ''
    })

    expect(RequiredStringValidator).toHaveBeenCalledWith('', 'vatNumber')
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should call TransactionAccountService with correct params', async () => {
    await sut.handle({
      first_name: 'any_user_name',
      last_name: 'any_last_user_name',
      vatNumber: 'any_valid_vatNumber'
    })

    expect(transactionAccountService.perform).toHaveBeenCalledWith({
      first_name: 'any_user_name',
      last_name: 'any_last_user_name',
      vatNumber: 'any_valid_vatNumber'
    })
    expect(transactionAccountService.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 500 if perform method fail', async () => {
    transactionAccountService.perform.mockResolvedValueOnce(new InternalServerError())
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
    const error = new Error('ANY_INFRA_ERROR')
    transactionAccountService.perform.mockResolvedValueOnce(error)
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

  it('should return 200 if perform method succeeds', async () => {
    const httpResponse = await sut.handle({
      first_name: 'any_user_name',
      last_name: 'any_last_user_name',
      vatNumber: 'any_valid_vatNumber'
    })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id: 'any_valid_id',
        first_name: 'any_user_name',
        last_name: 'any_last_user_name',
        vatNumber: 'any_valid_vatNumber'
      }
    })
  })
})
