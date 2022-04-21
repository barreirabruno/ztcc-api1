import { LoadTransactionAccoutRepository } from '@/data/contracts/repos'
import { mock, MockProxy } from 'jest-mock-extended'

interface IsAccountActiveInterface {
  perform: (params: IsAccountActive.Input) => Promise<IsAccountActive.Output>
}

export namespace IsAccountActive {
  export enum TransactionAccountStatusEnum {
    AVAILABLE = 'available',
    UNAVAILABLE = 'unavailable'
  }

  export type Input = {
    vatNumber: string
  }
  export type Output = {
    status: TransactionAccountStatusEnum
  }
}

class IsAccountActiveService implements IsAccountActiveInterface {
  constructor (private readonly transactionAccountRepo: LoadTransactionAccoutRepository) {}

  async perform (params: IsAccountActive.Input): Promise<IsAccountActive.Output> {
    const searchTransactionAccount = await this.transactionAccountRepo.load({ vatNumber: params.vatNumber })
    if (searchTransactionAccount?.active === 1) {
      return {
        status: IsAccountActive.TransactionAccountStatusEnum.AVAILABLE
      }
    } else {
      return {
        status: IsAccountActive.TransactionAccountStatusEnum.UNAVAILABLE
      }
    }
  }
}

describe('IsAccountActiveService', () => {
  const mockTARepositoryData = {
    id: 'any_database_id',
    first_name: 'any_firstname',
    last_name: 'any_lastname',
    vatNumber: 'any_database_vatNumber'
  }
  let transactionAccountRepo: MockProxy<LoadTransactionAccoutRepository>
  let sut: IsAccountActiveService

  beforeAll(() => {
    transactionAccountRepo = mock()
    sut = new IsAccountActiveService(transactionAccountRepo)
  })

  it('should return available if active is equal to 1', async () => {
    transactionAccountRepo.load.mockResolvedValueOnce({
      ...mockTARepositoryData,
      active: 1
    })
    const transactionAccountStatus = await sut.perform({ vatNumber: 'any_vatnumber' })

    expect(transactionAccountStatus).toEqual({
      status: 'available'
    })
  })

  it('should return unavailable if active is not 1', async () => {
    transactionAccountRepo.load.mockResolvedValueOnce({
      ...mockTARepositoryData,
      active: 0
    })
    const transactionAccountStatus = await sut.perform({ vatNumber: 'any_vatnumber' })

    expect(transactionAccountStatus).toEqual({
      status: 'unavailable'
    })
  })

  it('should rethrow if transactionAccountRepository throw', async () => {
    transactionAccountRepo.load.mockRejectedValueOnce(new Error('any_LoadTransactionAccoutRepository_ERROR'))

    const transactionAccountStatus = sut.perform({ vatNumber: 'any_vatnumber' })

    await expect(transactionAccountStatus).rejects.toThrow(new Error('any_LoadTransactionAccoutRepository_ERROR'))
  })
})
