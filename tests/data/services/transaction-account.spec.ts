import { TransactionAccountService } from '@/data/services'
import { NotFoundError } from '@/domain/models/errors'

describe('TransactionAccountService', () => {
  it('should call LoadTransactionAccout with correct params', async () => {
    const fakeParams = {
      vatNumber: 'any_vatNumber'
    }

    const loadTAByVatNumber = { loadTransactionAccount: jest.fn() }
    const sut = new TransactionAccountService(loadTAByVatNumber)

    await sut.perform(fakeParams)

    expect(loadTAByVatNumber.loadTransactionAccount).toHaveBeenCalledWith(fakeParams)
    expect(loadTAByVatNumber.loadTransactionAccount).toHaveBeenCalledTimes(1)
  })

  it('should return NotFoundError if LoadTransactionAccout returns null', async () => {
    const fakeParams = {
      vatNumber: 'any_vatNumber'
    }

    const loadTAByVatNumber = {
      loadTransactionAccount: jest.fn()
    }
    loadTAByVatNumber.loadTransactionAccount.mockReturnValueOnce(null)
    const sut = new TransactionAccountService(loadTAByVatNumber)

    const loadTransactionAccount = await sut.perform(fakeParams)

    expect(loadTransactionAccount).toEqual(new NotFoundError())
  })
})
