import { LoadTransactionAccoutRepository, CreateTransactionAccoutRepository } from '@/data/contracts/repos'
import { TransactionAccountService } from '@/data/services'
import { InternalServerError } from '@/domain/models/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('TransactionAccountService', () => {
  let userAccountRepo: MockProxy<LoadTransactionAccoutRepository & CreateTransactionAccoutRepository>
  let sut: TransactionAccountService

  const fakeInpuCreateTransactionAccount = {
    first_name: 'any_firstname',
    last_name: 'any_lastname',
    vatNumber: 'any_vatNumber'
  }

  beforeEach(() => {
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue({
      id: 'any_database_id',
      first_name: 'any_firstname',
      last_name: 'any_lastname',
      vatNumber: 'any_vatNumber'
    })
    sut = new TransactionAccountService(
      userAccountRepo
    )
  })

  it('should call LoadTransactionAccoutRepo with correct params', async () => {
    await sut.perform(fakeInpuCreateTransactionAccount)

    expect(userAccountRepo.load).toHaveBeenCalledWith({ vatNumber: fakeInpuCreateTransactionAccount.vatNumber })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should call CreateTransactionAccountRepo when LoadTransactionAccout returns null', async () => {
    userAccountRepo.load.mockResolvedValueOnce(null)

    await sut.perform(fakeInpuCreateTransactionAccount)

    expect(userAccountRepo.create).toHaveBeenCalledWith(fakeInpuCreateTransactionAccount)
    expect(userAccountRepo.create).toHaveBeenCalledTimes(1)
  })

  it('should return Internal Server Error if LoadTransactionAccoutRepo fails', async () => {
    userAccountRepo.load.mockResolvedValueOnce(new InternalServerError())

    const loadTransactionAccount = await sut.perform(fakeInpuCreateTransactionAccount)

    expect(loadTransactionAccount).toEqual(new InternalServerError())
  })

  it('should return Internal Server Error if CreateTransactionAccountRepo fails', async () => {
    userAccountRepo.load.mockResolvedValueOnce(null)
    userAccountRepo.create.mockResolvedValueOnce(new InternalServerError())

    const loadTransactionAccount = await sut.perform(fakeInpuCreateTransactionAccount)

    expect(loadTransactionAccount).toEqual(new InternalServerError())
  })
})
