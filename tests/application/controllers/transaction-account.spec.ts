import { TransactionAccountInterface } from '@/domain/features/'
import { InternalServerError } from '@/domain/models/errors'
import { mock, MockProxy } from 'jest-mock-extended'
import { TransactionController } from '@/application/controllers'

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

  it('should return 400 if vatNumber is empty', async () => {
    const httpResponse = await sut.handle({
      first_name: 'any_user_name',
      last_name: 'any_last_user_name'
    })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field vatNumber is required')
    })
  })

  it('should return 400 if vatNumber is null', async () => {
    const httpResponse = await sut.handle({
      first_name: 'any_user_name',
      last_name: 'any_last_user_name',
      vatNumber: null
    })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field vatNumber is required')
    })
  })

  it('should return 400 if vatNumber is undefined', async () => {
    const httpResponse = await sut.handle({
      first_name: 'any_user_name',
      last_name: 'any_last_user_name',
      vatNumber: undefined
    })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field vatNumber is required')
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
      data: new InternalServerError()
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
      data: error
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
