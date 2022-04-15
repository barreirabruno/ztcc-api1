import { LoadTransactionAccout, LoadTransactionAccoutRepository, SaveTransactionAccoutRepository } from '@/data/contracts/repos'
import { getRepository } from 'typeorm'
import { PgTransactionAccount } from '../entities'

export class PgTransactionAccountRepository implements LoadTransactionAccoutRepository {
  private readonly pgTransactionAccountRepo = getRepository(PgTransactionAccount)

  async load (params: LoadTransactionAccout.Input): Promise<LoadTransactionAccout.Output> {
    const pgTA = await this.pgTransactionAccountRepo.findOne({ vatNumber: params.vatNumber })
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
    if (params.id === undefined) {
      await this.pgTransactionAccountRepo.save({
        first_name: params.first_name,
        last_name: params.last_name,
        vatNumber: params.vatNumber
      })
    } else {
      await this.pgTransactionAccountRepo.update({
        id: parseInt(params.id)
      }, {
        first_name: params.first_name,
        last_name: params.last_name
      })
    }
  }
}
