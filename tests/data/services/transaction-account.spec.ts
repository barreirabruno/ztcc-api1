import { LoadTransactionAccout } from '@/data/contracts/apis'
import { TransactionAccountService } from '@/data/services'
import { NotFoundError } from '@/domain/models/errors'

class LoadTransactionAccoutSpy implements LoadTransactionAccout {
  id?: string
  callsCount = 0
  result = null

  async loadTransactionAccount (input: LoadTransactionAccout.Input): Promise<LoadTransactionAccout.Output> {
    this.id = 'any_transaction_account_id'
    this.callsCount++
    return this.result
  }
}

describe('TransactionAccountService', () => {
  it('should call LoadTransactionAccout with correct params', async () => {
    const fakeParams = {
      vatNumber: 'any_vatNumber'
    }

    const loadTAByVatNumber = new LoadTransactionAccoutSpy()
    const sut = new TransactionAccountService(loadTAByVatNumber)

    await sut.perform(fakeParams)

    expect(loadTAByVatNumber.id).toBe('any_transaction_account_id')
    expect(loadTAByVatNumber.callsCount).toBe(1)
  })

  it('should return NotFoundError if LoadTransactionAccout returns null', async () => {
    const fakeParams = {
      vatNumber: 'any_vatNumber'
    }

    const loadTAByVatNumberSpy = new LoadTransactionAccoutSpy()
    loadTAByVatNumberSpy.result = null
    const sut = new TransactionAccountService(loadTAByVatNumberSpy)

    const loadTransactionAccount = await sut.perform(fakeParams)

    expect(loadTransactionAccount).toEqual(new NotFoundError())
  })
})
