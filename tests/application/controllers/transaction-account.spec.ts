import { TransactionAccountInterface } from '@/domain/features/'
import { TransactionController } from '@/application/controllers'
import { RequiredStringValidator } from '@/application/validation'
import { mock, MockProxy } from 'jest-mock-extended'

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

  it('should build Validators correctly', async () => {
    const validators = await sut.buildValidators({
      first_name: 'any_user_name',
      last_name: 'any_last_user_name',
      vatNumber: ''
    })

    expect(validators).toEqual([
      new RequiredStringValidator('', 'vatNumber')
    ])
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
