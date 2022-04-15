import { LoadTransactionAccout } from '@/data/contracts/repos'

import { IBackup, newDb } from 'pg-mem'
import { Entity, PrimaryGeneratedColumn, Column, getRepository, Repository, getConnection } from 'typeorm'

class PgTransactionAccountRepository {
  async load (params: LoadTransactionAccout.Input): Promise<LoadTransactionAccout.Output> {
    const pgTransactionAccountRepo = getRepository(PgTransactionAccount)
    const pgTA = await pgTransactionAccountRepo.findOne({ vatNumber: params.vatNumber })
    if (pgTA !== undefined) {
      return {
        id: pgTA.id.toString(),
        first_name: pgTA.first_name ?? undefined,
        last_name: pgTA.last_name ?? undefined,
        vatNumber: pgTA.vatNumber
      }
    }
  }
}

@Entity()
class PgTransactionAccount {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: true })
  first_name!: string

  @Column({ nullable: true })
  last_name!: string

  @Column()
  vatNumber!: string
}

describe('PgTransactionAccountRepository', () => {
  let sut: PgTransactionAccountRepository
  let pgTransactionAccountRepo: Repository<PgTransactionAccount>
  let backup: IBackup

  beforeAll(async () => {
    const db = newDb()
    const connection = await db.adapters.createTypeormConnection({
      type: 'postgres',
      entities: [PgTransactionAccount]
    })
    await connection.synchronize()
    backup = db.backup()
    pgTransactionAccountRepo = getRepository(PgTransactionAccount)
  })

  afterAll(async () => {
    backup.restore()
    await getConnection().close()
  })

  beforeEach(() => {
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
})
