import { LoadTransactionAccoutRepository, SaveTransactionAccoutRepository } from '@/data/contracts/repos'
import { TransactionAccountService } from '@/data/services'
import { InternalServerError } from '@/domain/models/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('TransactionAccountService', () => {
  let userAccountRepo: MockProxy<LoadTransactionAccoutRepository &
  SaveTransactionAccoutRepository>
  let sut: TransactionAccountService

  const fakeInpuCreateTransactionAccount = {
    id: 'any_valid_id',
    first_name: 'any_firstname',
    last_name: 'any_lastname',
    vatNumber: 'any_vatNumber'
  }

  const storedTransactionAccount = {
    id: 'any_database_id',
    first_name: 'any_firstname',
    last_name: 'any_lastname',
    vatNumber: 'any_database_vatNumber'
  }

  beforeEach(() => {
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue({
      id: 'any_database_id',
      first_name: 'any_firstname',
      last_name: 'any_lastname',
      vatNumber: 'any_database_vatNumber'
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

  it('should call SaveTransactionAccountRepo when LoadTransactionAccout returns null', async () => {
    userAccountRepo.load.mockResolvedValueOnce(null)
    await sut.perform(fakeInpuCreateTransactionAccount)
    expect(userAccountRepo.save).toHaveBeenCalledWith(fakeInpuCreateTransactionAccount)
    expect(userAccountRepo.save).toHaveBeenCalledTimes(1)
  })

  it('should return Internal Server Error if CreateTransactionAccountRepo fails', async () => {
    userAccountRepo.load.mockResolvedValueOnce(null)
    userAccountRepo.save.mockResolvedValueOnce(new InternalServerError())

    const loadTransactionAccount = await sut.perform(fakeInpuCreateTransactionAccount)
    expect(loadTransactionAccount).toEqual(new InternalServerError())
  })

  it('should call SaveTransactionAccoutRepository when LoadTransactionAccout returns data', async () => {
    await sut.perform({
      first_name: 'any_firstname',
      last_name: 'any_lastname',
      vatNumber: 'any_vatNumber'
    })

    expect(userAccountRepo.save).toHaveBeenCalledWith(storedTransactionAccount)
    expect(userAccountRepo.save).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if LoadTransactionAccoutRepository throw an error', async () => {
    userAccountRepo.load.mockRejectedValueOnce(new Error('any_LoadTransactionAccoutRepository_ERROR'))

    const promise = sut.perform(fakeInpuCreateTransactionAccount)

    await expect(promise).rejects.toThrow(new Error('any_LoadTransactionAccoutRepository_ERROR'))
  })
})
