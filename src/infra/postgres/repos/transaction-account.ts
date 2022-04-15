import { LoadTransactionAccout, LoadTransactionAccoutRepository } from '@/data/contracts/repos'
import { getRepository } from 'typeorm'
import { PgTransactionAccount } from '../entities'

export class PgTransactionAccountRepository implements LoadTransactionAccoutRepository {
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
