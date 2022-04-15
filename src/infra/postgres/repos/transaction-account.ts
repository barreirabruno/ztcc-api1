import { LoadTransactionAccout, LoadTransactionAccoutRepository, SaveTransactionAccoutRepository } from '@/data/contracts/repos'
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

  async save (params: SaveTransactionAccoutRepository.Input): Promise<void> {
    const pgTransactionAccountRepo = getRepository(PgTransactionAccount)
    if (params.id === undefined) {
      await pgTransactionAccountRepo.save({
        first_name: params.first_name,
        last_name: params.last_name,
        vatNumber: params.vatNumber
      })
    } else {
      await pgTransactionAccountRepo.update({
        id: parseInt(params.id)
      }, {
        first_name: params.first_name,
        last_name: params.last_name
      })
    }
  }
}
