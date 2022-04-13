import { LoadTransactionAccoutRepository, CreateTransactionAccoutRepository } from '@/data/contracts/repos'
import { TransactionAccountService } from '@/data/services'
import { InternalServerError } from '@/domain/models/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('TransactionAccountService', () => {
  let loadTAByVatNumber: MockProxy<LoadTransactionAccoutRepository>
  let createTransactionAccountRepo: MockProxy<CreateTransactionAccoutRepository>
  let sut: TransactionAccountService

  const fakeInpuCreateTransactionAccount = {
    first_name: 'any_firstname',
    last_name: 'any_lastname',
    vatNumber: 'any_vatNumber'
  }

  beforeEach(() => {
    loadTAByVatNumber = mock()
    loadTAByVatNumber.load.mockResolvedValue({
      id: 'any_database_id',
      first_name: 'any_firstname',
      last_name: 'any_lastname',
      vatNumber: 'any_vatNumber'
    })
    createTransactionAccountRepo = mock()
    sut = new TransactionAccountService(
      loadTAByVatNumber,
      createTransactionAccountRepo
    )
  })

  it('should call LoadTransactionAccoutRepo with correct params', async () => {
    await sut.perform(fakeInpuCreateTransactionAccount)

    expect(loadTAByVatNumber.load).toHaveBeenCalledWith({ vatNumber: fakeInpuCreateTransactionAccount.vatNumber })
    expect(loadTAByVatNumber.load).toHaveBeenCalledTimes(1)
  })

  it('should call CreateTransactionAccountRepo when LoadTransactionAccout returns null', async () => {
    loadTAByVatNumber.load.mockResolvedValueOnce(null)

    await sut.perform(fakeInpuCreateTransactionAccount)

    expect(createTransactionAccountRepo.create).toHaveBeenCalledWith(fakeInpuCreateTransactionAccount)
    expect(createTransactionAccountRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should return Internal Server Error if LoadTransactionAccoutRepo fails', async () => {
    loadTAByVatNumber.load.mockResolvedValueOnce(new InternalServerError())

    const loadTransactionAccount = await sut.perform(fakeInpuCreateTransactionAccount)

    expect(loadTransactionAccount).toEqual(new InternalServerError())
  })
})
