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

  async save (params: SaveTransactionAccoutRepository.Input): Promise<SaveTransactionAccoutRepository.Output> {
    const pgTransactionAccountRepo = getRepository(PgTransactionAccount)
    let saveTransactionAccount
    if (params.id === undefined) {
      const transactionAccount = await pgTransactionAccountRepo.save({
        first_name: params.first_name,
        last_name: params.last_name,
        vatNumber: params.vatNumber
      })
      saveTransactionAccount = {
        id: transactionAccount.id.toString(),
        first_name: transactionAccount.first_name,
        last_name: transactionAccount.last_name,
        vatNumber: transactionAccount.vatNumber
      }
    } else {
      await pgTransactionAccountRepo.update({
        id: parseInt(params.id)
      }, {
        first_name: params.first_name,
        last_name: params.last_name
      })
      const findUpdatedAccount = await pgTransactionAccountRepo.findOne({ id: parseInt(params.id) })
      saveTransactionAccount = {
        id: findUpdatedAccount?.id.toString() ?? '',
        first_name: findUpdatedAccount?.first_name ?? '',
        last_name: findUpdatedAccount?.last_name ?? '',
        vatNumber: findUpdatedAccount?.vatNumber ?? ''
      }
    }
    return saveTransactionAccount
  }
}
