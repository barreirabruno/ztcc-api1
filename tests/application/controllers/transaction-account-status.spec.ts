import { TransactionAccountStatusService } from '@/data/services'
import { TransactionAccountStatus } from '@/domain/features'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, serverError } from '@/application/helpers'
import { InternalServerError } from '@/domain/models/errors'
import { mock, MockProxy } from 'jest-mock-extended'
import { RequiredStringValidator, ValidationBuilder, Validator } from '@/application/validation'

type HttpRequest = {
  vatNumber: string
}

type Model = Error | {
  status: string
}

export class TransactionAccountStatusController extends Controller {
  constructor (
    private readonly transactionAccountStatusService: TransactionAccountStatusService
  ) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const result = await this.transactionAccountStatusService.perform({
      vatNumber: httpRequest.vatNumber
    })
    if (result.constructor === InternalServerError ||
      result.constructor === Error) {
      return serverError(result)
    } else {
      return ok(result)
    }
  }

  override buildValidators (httpRequest: any): Validator[] {
    return [
      ...ValidationBuilder.of({ value: httpRequest.vatNumber, fieldName: 'vatNumber' }).required().build()
    ]
  }
}

describe('TransactionAccountStatus', () => {
  let transactionAccountStatusService: MockProxy<TransactionAccountStatusService>
  let sut: TransactionAccountStatusController

  beforeAll(() => {
    transactionAccountStatusService = mock()
    transactionAccountStatusService.perform.mockResolvedValue({
      status: TransactionAccountStatus.TransactionAccountStatusEnum.AVAILABLE
    })
    sut = new TransactionAccountStatusController(transactionAccountStatusService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should build validators correctly', async () => {
    const validators = await sut.buildValidators({
      vatNumber: ''
    })

    expect(validators).toEqual([
      new RequiredStringValidator('', 'vatNumber')
    ])
  })

  it('should call TransactionAccountStatusService with correct params', async () => {
    await sut.handle({
      vatNumber: 'any_vatNumber'
    })

    expect(transactionAccountStatusService.perform).toHaveBeenCalledWith({ vatNumber: 'any_vatNumber' })
    expect(transactionAccountStatusService.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 200 if perform method succeeds', async () => {
    const transactionAccountStatusService = await sut.handle({
      vatNumber: 'any_vatNumber'
    })
    expect(transactionAccountStatusService).toEqual({
      statusCode: 200,
      data: {
        status: TransactionAccountStatus.TransactionAccountStatusEnum.AVAILABLE
      }
    })
  })
})
