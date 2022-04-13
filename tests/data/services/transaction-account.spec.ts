import { LoadTransactionAccout } from '@/data/contracts/apis'
import { TransactionAccountService } from '@/data/services'
import { NotFoundError } from '@/domain/models/errors'

import { mock, MockProxy } from 'jest-mock-extended'

type SutTypes = {
  sut: TransactionAccountService
  loadTAByVatNumber: MockProxy<LoadTransactionAccout>
}

const makeSut = (): SutTypes => {
  const loadTAByVatNumber = mock<LoadTransactionAccout>()
  const sut = new TransactionAccountService(loadTAByVatNumber)
  return {
    sut,
    loadTAByVatNumber
  }
}

const fakeParams = {
  vatNumber: 'any_vatNumber'
}

describe('TransactionAccountService', () => {
  it('should call LoadTransactionAccout with correct params', async () => {
    const { sut, loadTAByVatNumber } = makeSut()
    await sut.perform(fakeParams)

    expect(loadTAByVatNumber.loadTransactionAccount).toHaveBeenCalledWith(fakeParams)
    expect(loadTAByVatNumber.loadTransactionAccount).toHaveBeenCalledTimes(1)
  })

  it('should return NotFoundError if LoadTransactionAccout returns null', async () => {
    const { sut, loadTAByVatNumber } = makeSut()
    loadTAByVatNumber.loadTransactionAccount.mockResolvedValueOnce(null)

    const loadTransactionAccount = await sut.perform(fakeParams)

    expect(loadTransactionAccount).toEqual(new NotFoundError())
  })
})
