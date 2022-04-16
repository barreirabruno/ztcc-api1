import { TransactionAccountInterface } from '@/domain/features/'
import { mock } from 'jest-mock-extended'

type HttpResponse = {
  statusCode: number
  data: any
}

class TransactionController {
  constructor (
    private readonly transactionControllerService: TransactionAccountInterface
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    await this.transactionControllerService.perform({
      first_name: httpRequest.first_name,
      last_name: httpRequest.last_name,
      vatNumber: httpRequest.vatNumber
    })
    return {
      statusCode: 400,
      data: new Error('The field vatNumber is required')
    }
  }
}

describe('TransactionAccountController', () => {
  let sut: TransactionController
  let transactionAccountService: TransactionAccountInterface

  beforeAll(() => {
    transactionAccountService = mock<TransactionAccountInterface>()
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
})
