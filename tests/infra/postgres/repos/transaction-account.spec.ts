import { LoadTransactionAccout } from '@/data/contracts/repos'

import { newDb } from 'pg-mem'
import { Entity, PrimaryGeneratedColumn, Column, getRepository } from 'typeorm'

class PgAccountRepository {
  async load (params: LoadTransactionAccout.Input): Promise<LoadTransactionAccout.Output> {
    const pgTransactionAccountRepo = getRepository(PgTransactionAccount)
    const pgTA = await pgTransactionAccountRepo.findOne({ vatNumber: 'xxxxxxxxxxx' })
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
  describe('load', () => {
    it('should return an account if vatNumber exists', async () => {
      const db = newDb()
      const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [PgTransactionAccount]
      })
      await connection.synchronize()
      const pgTransactionAccountRepo = getRepository(PgTransactionAccount)
      await pgTransactionAccountRepo.save({
        vatNumber: 'xxxxxxxxxxx'
      })

      const sut = new PgAccountRepository()

      const transactionAccount = await sut.load({ vatNumber: 'xxxxxxxxxxx' })

      expect(transactionAccount).toEqual({
        id: '1',
        vatNumber: 'xxxxxxxxxxx'
      })
    })
  })
})
