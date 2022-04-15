import { PgTransactionAccount } from '@/infra/postgres/entities'
import { PgTransactionAccountRepository } from '@/infra/postgres/repos'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

import { IBackup } from 'pg-mem'
import { getRepository, Repository, getConnection } from 'typeorm'

describe('PgTransactionAccountRepository', () => {
  let sut: PgTransactionAccountRepository
  let pgTransactionAccountRepo: Repository<PgTransactionAccount>
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb([PgTransactionAccount])
    backup = db.backup()
    pgTransactionAccountRepo = getRepository(PgTransactionAccount)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgTransactionAccountRepository()
  })

  describe('load', () => {
    it('should return an account if vatNumber exists', async () => {
      await pgTransactionAccountRepo.save({ vatNumber: 'xxxxxxxxxxx' })
      const transactionAccountA = await sut.load({ vatNumber: 'xxxxxxxxxxx' })

      expect(transactionAccountA).toEqual({
        id: '1',
        vatNumber: 'xxxxxxxxxxx'
      })
    })

    it('should return undefined if vatNumber not exists', async () => {
      const transactionAccount = await sut.load({ vatNumber: '00000000000' })

      expect(transactionAccount).toBeUndefined()
    })
  })

  describe('save', () => {
    it('should create an account if id is undefined', async () => {
      await sut.save({
        first_name: 'any_first_name_test',
        last_name: 'any_last_name_test',
        vatNumber: '00000000001'
      })
      const findTransactionAccount = await pgTransactionAccountRepo.findOne({ vatNumber: '00000000001' })

      expect(findTransactionAccount?.id).toBe(1)
    })

    it('should create an account if id defined', async () => {
      await sut.save({
        first_name: 'any_first_name_test_A',
        last_name: 'any_last_name_test_A',
        vatNumber: '00000000002'
      })

      await sut.save({
        id: '1',
        first_name: 'any_first_name_test_UPDATED',
        last_name: 'any_last_name_test_UPDATED',
        vatNumber: '00000000002'
      })

      const findTransactionAccount = await pgTransactionAccountRepo.findOne({ id: 1 })

      expect(findTransactionAccount).toEqual({
        id: 1,
        first_name: 'any_first_name_test_UPDATED',
        last_name: 'any_last_name_test_UPDATED',
        vatNumber: '00000000002'
      })
    })
  })
})
