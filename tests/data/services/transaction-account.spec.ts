import { LoadTransactionAccout } from '@/data/contracts/apis'
import { TransactionAccountService } from '@/data/services'
import { NotFoundError } from '@/domain/models/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('TransactionAccountService', () => {
  let loadTAByVatNumber: MockProxy<LoadTransactionAccout>
  let sut: TransactionAccountService

  const fakeParams = {
    vatNumber: 'any_vatNumber'
  }

  beforeEach(() => {
    loadTAByVatNumber = mock()
    sut = new TransactionAccountService(loadTAByVatNumber)
  })

  it('should call LoadTransactionAccout with correct params', async () => {
    await sut.perform(fakeParams)

    expect(loadTAByVatNumber.loadTransactionAccount).toHaveBeenCalledWith(fakeParams)
    expect(loadTAByVatNumber.loadTransactionAccount).toHaveBeenCalledTimes(1)
  })

  it('should return NotFoundError if LoadTransactionAccout returns null', async () => {
    loadTAByVatNumber.loadTransactionAccount.mockResolvedValueOnce(null)

    const loadTransactionAccount = await sut.perform(fakeParams)

    expect(loadTransactionAccount).toEqual(new NotFoundError())
  })
})
