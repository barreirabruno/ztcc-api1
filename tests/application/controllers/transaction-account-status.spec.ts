import { TransactionAccountStatusService } from '@/data/services'
import { TransactionAccountStatus } from '@/domain/features'
import { mock, MockProxy } from 'jest-mock-extended'
import { RequiredStringValidator, NumerableStringValidator, MinLengthStringValidator, MaxLengthStringValidator } from '@/application/validation'
import { TransactionAccountStatusController } from '@/application/controllers'

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
      new RequiredStringValidator('', 'vatNumber'),
      new NumerableStringValidator('', 'vatNumber'),
      new MinLengthStringValidator('', 'vatNumber'),
      new MaxLengthStringValidator('', 'vatNumber')
    ])
  })

  it('should call TransactionAccountStatusService with correct params', async () => {
    await sut.handle({
      vatNumber: '00000000000'
    })

    expect(transactionAccountStatusService.perform).toHaveBeenCalledWith({ vatNumber: '00000000000' })
    expect(transactionAccountStatusService.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 200 if perform method succeeds', async () => {
    const transactionAccountStatusService = await sut.handle({
      vatNumber: '00000000000'
    })
    expect(transactionAccountStatusService).toEqual({
      statusCode: 200,
      data: {
        status: TransactionAccountStatus.TransactionAccountStatusEnum.AVAILABLE
      }
    })
  })
})
