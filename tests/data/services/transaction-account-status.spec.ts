import { LoadTransactionAccoutRepository } from '@/data/contracts/repos'
import { TransactionAccountStatusService } from '@/data/services/transaction-account-status-service'

import { mock, MockProxy } from 'jest-mock-extended'

describe('IsAccountActiveService', () => {
  const mockTARepositoryData = {
    id: 'any_database_id',
    first_name: 'any_firstname',
    last_name: 'any_lastname',
    vatNumber: 'any_database_vatNumber'
  }
  let transactionAccountRepo: MockProxy<LoadTransactionAccoutRepository>
  let sut: TransactionAccountStatusService

  beforeAll(() => {
    transactionAccountRepo = mock()
    sut = new TransactionAccountStatusService(transactionAccountRepo)
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
